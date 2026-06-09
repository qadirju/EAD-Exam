import Task from '../models/Task.js'

// Get all tasks for a user
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate('subject')
    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

// Get single task
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('subject')
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

// Create task
export const createTask = async (req, res, next) => {
  try {
    const { subject, title, description, dueDate, priority } = req.body

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ message: 'Title, subject, and due date are required' })
    }

    const task = await Task.create({
      user: req.user.id,
      subject,
      title,
      description,
      dueDate,
      priority
    })

    const populatedTask = await Task.findById(task._id).populate('subject')

    res.status(201).json({ success: true, data: populatedTask })
  } catch (error) {
    next(error)
  }
}

// Update task
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('subject')

    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await Task.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}

// Toggle task completion
export const toggleTaskStatus = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    task.completed = req.body.completed
    task.completedAt = req.body.completed ? new Date() : null
    await task.save()

    const populatedTask = await Task.findById(task._id).populate('subject')

    res.status(200).json({ success: true, data: populatedTask })
  } catch (error) {
    next(error)
  }
}
