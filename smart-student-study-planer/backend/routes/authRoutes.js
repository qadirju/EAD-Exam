import express from 'express'
import { register, login, logout, me, updateMe } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, me)
router.put('/me', authMiddleware, updateMe)
router.post('/logout', logout)

export default router
