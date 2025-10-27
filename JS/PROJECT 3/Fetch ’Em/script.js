// -------------------------------
// Fetch 'Em - Mini Pokédex Logic
// -------------------------------

// Base API endpoint
const API_BASE = "https://pokeapi.co/api/v2";

// Elements
const inputEl = document.getElementById("q");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const cancelBtn = document.getElementById("cancelBtn");
const statusEl = document.getElementById("status");
const cardEl = document.getElementById("card");
const spriteEl = document.getElementById("pokemonSprite");
const nameEl = document.getElementById("pokemonName");
const idEl = document.getElementById("pokemonId");
const typesEl = document.getElementById("pokemonTypes");
const statsEl = document.getElementById("pokemonStats");
const historyEl = document.getElementById("history");

// -------------------------------
// Cache + History
// -------------------------------
const cache = new Map();      // cache responses by ID
const history = [];           // keep last 10 searches

// -------------------------------
// AbortController (cancel requests)
// -------------------------------
let currentController = null;

// Utility: set status text
function setStatus(msg) {
  statusEl.textContent = msg;
}

// Utility: render Pokémon card
function renderPokemon(data) {
  // Fill card UI
  spriteEl.src = data.sprite;
  nameEl.textContent = data.name;
  idEl.textContent = data.id;
  typesEl.textContent = data.types.join(", ");
  
  // Render stats list
  statsEl.innerHTML = "";
  data.stats.forEach(stat => {
    const li = document.createElement("li");
    li.textContent = `${stat.name}: ${stat.value}`;
    statsEl.appendChild(li);
  });

  // Species color → card border
  cardEl.style.borderColor = data.color || "#ccc";
  cardEl.classList.remove("hidden");
}

// Utility: add to history
function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) history.pop();

  // Render list
  historyEl.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      inputEl.value = item;
      fetchPokemon(item); // search again
    });
    historyEl.appendChild(li);
  });
}

// -------------------------------
// Timeout + Retry helpers
// -------------------------------

// Promise that rejects after a timeout
function fetchWithTimeout(url, { signal, timeout = 5000 }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), timeout);
    fetch(url, { signal })
      .then(res => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Retry wrapper with exponential backoff
async function retry(fn, { retries = 3, backoffMs = 500 }) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, backoffMs * (i + 1)));
      }
    }
  }
  throw lastError;
}

// -------------------------------
// Different async styles
// -------------------------------

// 1) Callback style (fake demo only)
function fakeCallbackPipeline(query, cb) {
  setStatus("Simulating callback pipeline...");

  setTimeout(() => {
    // Step 1: normalize
    const normalized = query.trim().toLowerCase();

    // Step 2: validation
    if (!normalized) {
      cb(new Error("Invalid input"), null);
      return;
    }

    // Step 3: success
    cb(null, normalized);
  }, 1000);
}

// 2) Promise chaining style
function fetchPokemonThenStyle(query) {
  setStatus("Loading with .then style...");

  currentController = new AbortController();

  return fetchWithTimeout(`${API_BASE}/pokemon/${query}`, {
    signal: currentController.signal,
    timeout: 5000
  })
    .then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
    })
    .then(pokemon => {
      // fetch species in parallel
      return Promise.all([
        Promise.resolve(pokemon),
        fetch(`${API_BASE}/pokemon-species/${pokemon.id}`, { signal: currentController.signal })
          .then(res => res.json())
      ]);
    })
    .then(([pokemon, species]) => {
      const data = {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
        stats: pokemon.stats.map(s => ({
          name: s.stat.name,
          value: s.base_stat
        })),
        color: species.color.name
      };
      renderPokemon(data);
      addToHistory(pokemon.name);
      cache.set(pokemon.id, data);
      setStatus("Done (.then style)");
    })
    .catch(err => setStatus(`Error: ${err.message}`));
}

// 3) Async/Await production handler
async function fetchPokemon(query) {
  setStatus("Loading (async/await)...");
  cardEl.classList.add("hidden");

  // Abort ongoing requests
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    // Check cache first
    if (cache.has(query)) {
      renderPokemon(cache.get(query));
      setStatus("Loaded from cache ✅");
      return;
    }

    // Use retry + timeout
    const pokemon = await retry(() =>
      fetchWithTimeout(`${API_BASE}/pokemon/${query}`, {
        signal: currentController.signal,
        timeout: 5000
      }).then(res => {
        if (!res.ok) throw new Error("Pokémon not found");
        return res.json();
      }), { retries: 3, backoffMs: 600 });

    // Fetch species in parallel
    const [species] = await Promise.all([
      fetch(`${API_BASE}/pokemon-species/${pokemon.id}`, { signal: currentController.signal }).then(res => res.json())
    ]);

    const data = {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map(t => t.type.name),
      stats: pokemon.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      color: species.color.name
    };

    // Render + save
    renderPokemon(data);
    addToHistory(pokemon.name);
    cache.set(query, data);
    setStatus("Done (async/await)");
  } catch (err) {
    if (err.name === "AbortError") {
      setStatus("Request canceled ❌");
    } else {
      setStatus(`Error: ${err.message}`);
    }
  }
}

// -------------------------------
// Event listeners
// -------------------------------

searchBtn.addEventListener("click", () => {
  const q = inputEl.value.trim().toLowerCase();
  if (!q) {
    setStatus("Please enter a Pokémon name or ID");
    return;
  }

  // Start with async/await production handler
  fetchPokemon(q);
});

randomBtn.addEventListener("click", () => {
  // Pokémon IDs are around 1–1010 (Gen 9)
  const randomId = Math.floor(Math.random() * 1010) + 1;
  fetchPokemon(randomId);
});

cancelBtn.addEventListener("click", () => {
  if (currentController) {
    currentController.abort();
  }
});
