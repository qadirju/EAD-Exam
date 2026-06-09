import Subject from '../models/Subject.js'

// Get all subjects for a user
export const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ user: req.user.id })
    res.status(200).json({ success: true, data: subjects })
  } catch (error) {
    next(error)
  }
}

// Get single subject
export const getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id)
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' })
    }

    if (subject.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.status(200).json({ success: true, data: subject })
  } catch (error) {
    next(error)
  }
}

// Create subject
export const createSubject = async (req, res, next) => {
  try {
    const { name, code, description, instructor, credits, color } = req.body

    if (!name || !code) {
      return res.status(400).json({ message: 'Subject name and code are required' })
    }

    const subject = await Subject.create({
      user: req.user.id,
      name,
      code,
      description,
      instructor,
      credits,
      color
    })

    res.status(201).json({ success: true, data: subject })
  } catch (error) {
    next(error)
  }
}

// Update subject
export const updateSubject = async (req, res, next) => {
  try {
    let subject = await Subject.findById(req.params.id)

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' })
    }

    if (subject.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({ success: true, data: subject })
  } catch (error) {
    next(error)
  }
}

// Delete subject
export const deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id)

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' })
    }

    if (subject.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await Subject.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: 'Subject deleted' })
  } catch (error) {
    next(error)
  }
}
