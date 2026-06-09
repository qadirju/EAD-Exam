import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
} from '../controllers/taskController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.put('/:id', updateTask)
router.patch('/:id', toggleTaskStatus)
router.delete('/:id', deleteTask)

export default router
