import { Outlet, Link } from "react-router-dom";


function MainBase({handleLogin, handleLogout, currentUser}) {
    return (
        <>

        <nav style={{display:'flex', gap:'1rem'}} className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            {currentUser && <span>Welcome, {currentUser.name}!</span>}
            {currentUser ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}><Link to="/login" className="nav-link">Login</Link></button>}
        </nav>

        <header className="header">
            <h2>REACT ROUTER IS AWESOME</h2>
        </header>

        <main style={{textAlign: 'center'}}>
            <Outlet />
        </main>

        <footer className="footer">
            <h2>My Awesome Footer</h2>
        </footer>

        </>
    )
}

export default MainBase