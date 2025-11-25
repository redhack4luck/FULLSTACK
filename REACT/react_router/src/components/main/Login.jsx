function Login({handleLogin}) {
    return (
        <form onSubmit={handleLogin} className="login-form">
            <input 
                type="text" 
                placeholder="Email"
                name="email"
            />
            <input 
                type="password" 
                placeholder="Password"
                name="password"
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login