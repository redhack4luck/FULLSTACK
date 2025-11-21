import './App.css';
import { useState } from 'react';
import useFetch from './components/useFetch';
import useLocalStorage from './components/useLocalStorage';
import useToggle from './components/useToggle';
import Timer from './components/Timer';

function App() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [reduit, setReduit] = useToggle(false);

  function filterByName(users, searchTerm) {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Create filtered data without modifying the original data
  const filteredData = search !== "" ? filterByName(data, search) : data;

  return (
    
    <div className={theme} style={{padding: "20px"}}>
      <Timer /><hr />
      <h1>Annuaire utilisateurs</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Changer Theme</button>
      <hr />
      <input style={{padding: "10px", margin: "10px"}} 
        type="text" 
        placeholder="Rechercher" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button onClick={setReduit}>Afficher/Masquer</button>
      <hr />
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>} {/* Fixed: error is a string */}
      
      
        {filteredData.map(user => (
          <ul key={user.id} style={{listStyleType: "none", border: "1px solid #ccc", padding: "10px", borderRadius: "5px"}}>
            <li>{user.name}</li>
            {
              !reduit && (
                <>
                <li>{user.username}</li>
                <li>{user.email}</li>
                </>
              )
            }
            
          </ul>
        
        ))}
   
    </div>
  );
}

export default App;