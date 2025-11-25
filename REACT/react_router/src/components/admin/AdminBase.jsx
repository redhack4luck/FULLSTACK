import { NavLink, Outlet } from "react-router-dom"

function AdminBase({handleLogout, user}) {
    return (
        <>
        <nav style={{display:'flex', gap:'1rem'}} className="navbar">
            {user && <span>Welcome {user.name} (<span style={{color: 'red', fontWeight: 'bold'}}>admin Space</span>)</span>}
            <button onClick={handleLogout}>Logout</button>
        </nav>
        <section style={{display:'flex', gap:'1rem', justifyContent:'space-around'}}>
          <ul style={{listStyle:'none'}}>
            <li><NavLink to="/admin">Statistics</NavLink></li>
            <li><NavLink to="/admin/users">Users</NavLink></li>
            <li><NavLink to="/admin/products">Products</NavLink></li>
          </ul>
          <main>
            <Outlet />
          </main>
        </section>
        </>
    )
}

export default AdminBase