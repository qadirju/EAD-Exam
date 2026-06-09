import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAllSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject
} from '../controllers/subjectController.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getAllSubjects)
router.post('/', createSubject)
router.get('/:id', getSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

export default router
