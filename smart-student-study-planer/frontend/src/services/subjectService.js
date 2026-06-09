import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

const subjectService = {
  getAllSubjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/subjects`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch subjects'
    }
  },

  getSubject: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch subject'
    }
  },

  createSubject: async (subjectData) => {
    try {
      const response = await axios.post(`${API_URL}/subjects`, subjectData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create subject'
    }
  },

  updateSubject: async (id, subjectData) => {
    try {
      const response = await axios.put(`${API_URL}/subjects/${id}`, subjectData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update subject'
    }
  },

  deleteSubject: async (id) => {
    try {
      await axios.delete(`${API_URL}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete subject'
    }
  }
}

export default subjectService
