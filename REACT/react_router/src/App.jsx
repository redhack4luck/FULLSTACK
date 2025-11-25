import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import MainLayout from './components/main/MainBase'
import Home from './components/main/Home'
import About from './components/main/About'
import Login from './components/main/Login'
import AdminBase from './components/admin/AdminBase'
import Statistics from './components/admin/Statistics'
import Users from './components/admin/Users'
import Products from './components/admin/Products'
import Profile from './components/admin/Profile'

function App() {
  // STATES && DATA
  const [currentUser, setCurrentUser] = useState(null)
  const USERS = [
    {id: 1, name: 'Redouane', email: 'admin@gmail.com', password: '1234', role: 'admin'},
    {id: 2, name: 'User1', email: 'user1@gmail.com', password: '1234', role: 'user'},
    {id: 3, name: 'User2', email: 'user2@gmail.com', password: '1234', role: 'user'},
    {id: 4, name: 'User3', email: 'user3@gmail.com', password: '1234', role: 'user'}
  ]
  // HELPERS && HANDLERS
  const navigate = useNavigate()

  const checkedUser = (email, password) => {
    return USERS.find(user => user.email === email && user.password === password)
  }

  function handleLogin(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const user = checkedUser(email, password)
    if(user && user.role === 'admin') {
      navigate('/admin')
      setCurrentUser(user)
      alert('You have been logged in')
    }else if(user && user.role === 'user') {
      navigate('/')
      setCurrentUser(user)
      alert('You have been logged in')
    } else {
      alert('Invalid credentials')
    }
  }

  function handleLogout() {
    setCurrentUser(null)
    navigate('/')
    alert('You have been logged out')
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout handleLogin={handleLogin} handleLogout={handleLogout} currentUser={currentUser} />}>
      <Route path="login" element={<Login handleLogin={handleLogin} />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="admin" element={<AdminBase handleLogout={handleLogout} user={currentUser} />}>
        <Route index element={<Statistics />} />
        <Route path="users" element={<Users users={USERS} />} />
        <Route path="users/:id" element={<Profile users={USERS} />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
    </>
  
  )
}

export default App
