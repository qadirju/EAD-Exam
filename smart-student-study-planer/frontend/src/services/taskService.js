import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch tasks'
    }
  },

  getTask: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch task'
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create task'
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update task'
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete task'
    }
  },

  toggleTaskStatus: async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update task status'
    }
  }
}

export default taskService
