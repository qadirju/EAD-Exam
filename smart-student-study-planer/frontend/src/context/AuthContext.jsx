import React, { createContext, useState, useContext, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const loadUser = async () => {
      if (!storedToken) {
        setLoading(false)
        return
      }

      setToken(storedToken)

      try {
        const response = await authService.getMe()
        setUser(response.user)
      } catch {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const updateProfile = async (profileData) => {
    const response = await authService.updateMe(profileData)
    setUser(response.user)
    return response
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
