const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Temporary data (we'll replace with database later)
let tasks = [
  { id: 1, title: 'Setup project', status: 'Done' },
  { id: 2, title: 'Build login page', status: 'Done' },
  { id: 3, title: 'Build dashboard', status: 'In Progress' },
  { id: 4, title: 'Build tasks page', status: 'In Progress' },
  { id: 5, title: 'Connect backend', status: 'To Do' },
]

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// POST create a task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: 'To Do'
  }
  tasks.push(newTask)
  res.json(newTask)
})

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id))
  res.json({ message: 'Task deleted' })
})

// PATCH complete a task
app.patch('/api/tasks/:id', (req, res) => {
  tasks = tasks.map(task =>
    task.id === parseInt(req.params.id) ? { ...task, status: 'Done' } : task
  )
  res.json({ message: 'Task updated' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})