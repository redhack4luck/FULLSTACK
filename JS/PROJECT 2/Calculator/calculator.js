
const displayEl = document.getElementById("display"); // Récupérer l’élément écran
const keysEl = document.getElementById("keys");       // Récupérer l’élément des touches
const historyEl = document.getElementById("history"); // Récupérer l’élément historique

// Objet d’état pour stocker les valeurs de la calculatrice
let state = {
  current: "0",       // Le nombre en cours de saisie
  previous: null,     // Le nombre stocké précédemment
  operator: null,     // L’opérateur stocké (+ - × ÷)
  overwrite: false    // Indique si l’écran doit être écrasé après un opérateur
};


function handleDigit(value) {
  if (state.overwrite) {
    state.current = value;  // Remplacer la valeur affichée
    state.overwrite = false;
    return;
  }
  if (value === "." && state.current.includes(".")) return; // Empêcher plusieurs virgules
  if (state.current === "0" && value !== ".") {
    state.current = value; // Éviter les zéros en tête
  } else {
    state.current += value; // Ajouter le chiffre
  }
}


function handleOperator(op, event) {
  event.stopPropagation(); // L’événement est traité uniquement sur l’élément cliqué et ne remonte pas aux parents

  if (state.previous !== null && state.operator) {
    evaluate(); // Effectuer le calcul si une opération est déjà en attente
  }
  state.previous = state.current; // Sauvegarder le nombre courant
  state.operator = op;            // Sauvegarder l’opérateur
  state.overwrite = true;         // Activer le mode remplacement
}
// Fonction utilitaire : exécuter le calcul
function evaluate() {
  const a = parseFloat(state.previous);
  const b = parseFloat(state.current);
  let result = 0;

  switch (state.operator) {
    case "+": result = a + b; break;                 // Addition
    case "−": result = a - b; break;                 // Soustraction
    case "×": result = a * b; break;                 // Multiplication
    case "÷": result = b === 0 ? "Error" : a / b; break; // Division avec gestion du /0
  }
  state.current = result.toString(); // Convertir le résultat en texte
  state.overwrite = true;
}
//**fct Pour ajoute les traces des calculer dans  history*/
function addToHistory(entry) {
  const li = document.createElement("li"); // Créer un nouvel élément de liste
  li.textContent = entry;                  // Lui donner le texte de l’opération
  historyEl.prepend(li);                   // L’ajouter en haut de la liste
  if (historyEl.children.length > 5) {     // Si plus de 5 éléments dans l’historique
    historyEl.removeChild(historyEl.lastChild); // Supprimer le plus ancien
  }
}

function handleEquals() {
  if (state.previous !== null && state.operator) {
    // Sauvegarder les valeurs avant que le calcul les écrase
    const left = state.previous;
    const op = state.operator;
    const right = state.current;

    evaluate(); // Exécuter le calcul

    // Ajouter l’opération dans l’historique
    addToHistory(`${left} ${op} ${right} = ${state.current}`);

    // Réinitialiser l’opérateur et le précédent
    state.previous = null;
    state.operator = null;
  }
}

function handleCommand(cmd) {
  if (cmd === "AC") {
    // Réinitialiser complètement la calculatrice et vider l’historique
    state = { current: "0", previous: null, operator: null, overwrite: false };
    historyEl.innerHTML = "";
  }
  if (cmd === "CE") {
    // Effacer uniquement la valeur courante
    state.current = "0";
  }
  if (cmd === "neg") {
    // Changer le signe du nombre
    if (state.current !== "0") {
      state.current = (parseFloat(state.current) * -1).toString();
    }
  }
  if (cmd === "pct") {
    // Convertir le nombre en pourcentage
    state.current = (parseFloat(state.current) / 100).toString();
  }
}

function formatNumber(n) {
  if (n === "Error") return "Error"; // Afficher "Error"
  let num = parseFloat(n);
  if (isNaN(num)) return "0"; // Si ce n’est pas un nombre

  let str = num.toPrecision(12);     // Limiter la précision à 12 chiffres
  str = parseFloat(str).toString();  // Supprimer les zéros inutiles
  if (str.length > 12) {
    str = num.toExponential(6);      // Passer en notation scientifique si trop long
  }
  return str;
}

function updateDisplay() {
  displayEl.textContent = formatNumber(state.current); 
}

keysEl.addEventListener("click", (event) => {
  const button = event.target.closest("button"); // Trouver le bouton cliqué
  if (!button) return; // Ignorer les clics en dehors des boutons
  console.log("keys clicked");

  const type = button.dataset.type;   // Type du bouton (chiffre, opérateur, égal, commande)
  const value = button.dataset.value; // Valeur du bouton (ex. "7", "+", "AC")

  // Utilisation d’un switch au lieu de plusieurs if/else
  switch (type) {
    case "digit":     // Si c’est un chiffre
      handleDigit(value);
      break;

    case "op":        // Si c’est un opérateur
      handleOperator(value, event);
      break;

    case "eq":        // Si c’est le bouton égal
      handleEquals();
      break;

    case "cmd":       // Si c’est une commande (AC, CE, ±, %)
      handleCommand(value);
      break;

    default:          // Si le type est inconnu
      break;
  }

  // Mettre à jour l’écran après chaque clic
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) handleDigit(e.key); // Chiffres
  else if (e.key === ".") handleDigit(".");
  else if (["+", "-", "*", "/"].includes(e.key)) {
    const opMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    handleOperator(opMap[e.key], e); // Associer les touches du clavier aux opérateurs
  }
  else if (e.key === "Enter") handleEquals();          // Touche Entrée = égal
  else if (e.key === "Backspace") handleCommand("CE"); // Backspace = effacer
  else if (e.key === "Escape") handleCommand("AC");    // Escape = tout réinitialiser

  updateDisplay(); // Mise à jour de l’écran
});

const wrapperEl = document.getElementById("wrapper");

wrapperEl.addEventListener("click", () => {
  console.log("bubble wrapper"); 
});
wrapperEl.addEventListener("click", () => {
  console.log("capture wrapper"); 
}, { capture: true });
