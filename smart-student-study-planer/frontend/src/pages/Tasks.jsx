import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, CheckCircle2, Circle, Loader2 } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import taskService from '../services/taskService'
import subjectService from '../services/subjectService'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [subjects, setSubjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, completed
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  })

  // Fetch tasks and subjects on mount
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [tasksData, subjectsData] = await Promise.all([
        taskService.getAllTasks(),
        subjectService.getAllSubjects()
      ])
      setTasks(tasksData.data || [])
      setSubjects(subjectsData.data || [])
    } catch (err) {
      setError(err || 'Failed to load data')
      setTasks([])
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (formData.title && formData.subject && formData.dueDate) {
      try {
        if (editingTaskId) {
          const updatedTask = await taskService.updateTask(editingTaskId, formData)
          setTasks(tasks.map(task => task._id === editingTaskId ? updatedTask.data : task))
        } else {
          const newTask = await taskService.createTask(formData)
          setTasks([...tasks, newTask.data])
        }
        setFormData({ title: '', subject: '', description: '', dueDate: '', priority: 'medium' })
        setShowModal(false)
        setEditingTaskId(null)
      } catch (err) {
        setError(err || (editingTaskId ? 'Failed to update task' : 'Failed to create task'))
      }
    }
  }

  const openCreateModal = () => {
    setEditingTaskId(null)
    setFormData({ title: '', subject: '', description: '', dueDate: '', priority: 'medium' })
    setShowModal(true)
  }

  const openEditModal = (task) => {
    setEditingTaskId(task._id)
    setFormData({
      title: task.title || '',
      subject: typeof task.subject === 'object' ? task.subject._id : task.subject || '',
      description: task.description || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      priority: task.priority || 'medium'
    })
    setShowModal(true)
  }

  const handleToggleTask = async (id) => {
    const task = tasks.find(t => t._id === id)
    if (!task) return
    try {
      const updatedTask = await taskService.toggleTaskStatus(id, !task.completed)
      setTasks(tasks.map(t => t._id === id ? updatedTask.data : t))
    } catch (err) {
      setError(err || 'Failed to update task')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      setTasks(tasks.filter(t => t._id !== id))
    } catch (err) {
      setError(err || 'Failed to delete task')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">&times;</button>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary-900">Tasks</h1>
          <p className="text-gray-600 mt-2">Manage your academic tasks and assignments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center border-l-4 border-primary-600">
          <p className="text-gray-600 text-sm">Total Tasks</p>
          <p className="text-2xl font-bold text-primary-600">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border-l-4 border-amber-600">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border-l-4 border-green-600">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="relative">
              <TaskCard task={task} onToggle={handleToggleTask} />
              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <Edit2 size={16} className="text-primary-600" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <CheckCircle2 size={32} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {filter === 'completed' ? 'No Completed Tasks' : 'No Tasks Yet'}
          </h2>
          <p className="text-gray-600 mb-6">
            {filter === 'completed'
              ? 'Complete your first task to see it here'
              : 'Create your first task to get started'}
          </p>
          {filter !== 'completed' && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create Task
            </button>
          )}
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingTaskId ? 'Edit Task' : 'Add New Task'}
            </h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Complete Chapter 5"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  className="input-field"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>{subject.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="input-field"
                  placeholder="Task description..."
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    className="input-field"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingTaskId(null)
                    setFormData({ title: '', subject: '', description: '', dueDate: '', priority: 'medium' })
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingTaskId ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tasks
