import { useState } from "react";

function Search() {
    const [search, setSearch] = useState("");
    function filterByName(users, name) {
        return users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    function handleSearch(e) {
        setSearch(e.target.value);
        filterByName(users, e.target.value);
        
    }

    return (
    <input type="text" 
        placeholder="Rechercher" 
        value={search} 
        onChange={handleSearch}
    />)
}
    