import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Settings from './components/Settings'
import AddForm from './components/AddForm'
import TasksList from './components/TasksList'
import useToggle from './components/useToggle'
import useLocalStorage from './components/useLocalStorage'

function App() {
  
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setnewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [darkMode, toggleDarkMode] = useToggle()
  // FILTERS
  const filterByAll = () => {
    setFilter('all')
  }
  const filterByDone = () => {
    setFilter('done')
  }
  const filterByNotDone = () => {
    setFilter('not done')
  }
  const filteredTasks = filter === 'all' ? tasks : filter === 'done' ? tasks.filter(t => t.done === true) : tasks.filter(t => t.done === false)

  // MY FORM HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanInput = newTask.trim()
    if (tasks.some(t => t.title.toLowerCase() === cleanInput.toLowerCase())) {
      alert('This task already exists')
      return
    }
    if (cleanInput) {
      const newTaskObj = { 
        id: Date.now(),
        title: cleanInput,
        done: false
      }
      setTasks([...tasks, newTaskObj])
      setnewTask('')

    }
  }

  const handleChange = (e) => {
    setnewTask(e.target.value)
  }
  // TasksDisplay handlers
  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t))
  }

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }
  // FINAL RENDER
  return (
    <div style={darkMode ? {background: 'black', color: 'white'} : {background: 'white', color: 'black'}}>
      <Header />
      <Settings filterByAll={filterByAll} filterByDone={filterByDone} filterByNotDone={filterByNotDone} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <AddForm value={newTask} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <TasksList tasks={filteredTasks} handleToggle={handleToggle} handleDelete={handleDelete} />
      <Footer />
    </div>
  )
}

export default App