import { useState, useEffect } from 'react'
import './App.css'
import todoService from './services/todoService.js'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [category, setCategory] = useState('personal')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    const newTodo = {
      text: inputValue,
      completed: false,
      category,
      dueDate,
      priority,
      createdAt: new Date().toISOString()
    }
    
    const id = todoService.addTodo(newTodo)
    setTodos([...todos, { ...newTodo, id }])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    todoService.toggleTodo(id)
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    todoService.deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    const loadTodos = () => {
      const todos = todoService.getAllTodos()
      setTodos(todos)
    }
    loadTodos()
  }, [])

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-row">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="add-button">Add</button>
        </div>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <div className="todo-content">
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
              <div className="todo-details">
                <span className={`category-tag ${todo.category}`}>{todo.category}</span>
                {todo.dueDate && (
                  <span className="due-date">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className={`priority-tag ${todo.priority}`}>
                  {todo.priority}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App