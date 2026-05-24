const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    })
    res.json({ message: 'User created!', user })
  } catch (error) {
    res.status(400).json({ message: 'Email already exists' })
  }
})

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).json({ message: 'User not found' })
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(400).json({ message: 'Wrong password' })
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ token })
})

// MIDDLEWARE - protect routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// GET all tasks
app.get('/api/tasks', authenticate, async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId } })
  res.json(tasks)
})

// POST create a task
app.post('/api/tasks', authenticate, async (req, res) => {
  const newTask = await prisma.task.create({
    data: {
      title: req.body.title,
      status: 'To Do',
      userId: req.userId
    }
  })
  res.json(newTask)
})

// DELETE a task
app.delete('/api/tasks/:id', authenticate, async (req, res) => {
  await prisma.task.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ message: 'Task deleted' })
})

// PATCH complete a task
app.patch('/api/tasks/:id', authenticate, async (req, res) => {
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