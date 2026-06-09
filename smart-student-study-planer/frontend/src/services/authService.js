import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Login failed'
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed'
    }
  },

  getMe: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to load user'
    }
  },

  updateMe: async (profileData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`${API_URL}/auth/me`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile'
    }
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? JSON.parse(atob(token.split('.')[1])) : null
  }
}

export default authService
