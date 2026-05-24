const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

// POST create a task
app.post('/api/tasks', async (req, res) => {
  const newTask = await prisma.task.create({
    data: {
      title: req.body.title,
      status: 'To Do'
    }
  })
  res.json(newTask)
})

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
  await prisma.task.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ message: 'Task deleted' })
})

// PATCH complete a task
app.patch('/api/tasks/:id', async (req, res) => {
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(req.params.id) },
    data: { status: 'Done' }
  })
  res.json(updatedTask)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})