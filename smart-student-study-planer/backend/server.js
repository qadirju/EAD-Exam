import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Smart Student Study Planer API is running', status: 'ok' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/tasks', taskRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`)
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`)
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`)
})

export default app
