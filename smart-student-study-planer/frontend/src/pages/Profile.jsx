import React, { useEffect, useState } from 'react'
import { User, Mail, Calendar, Award } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import subjectService from '../services/subjectService'
import taskService from '../services/taskService'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [stats, setStats] = useState({ subjects: 0, tasks: 0, completion: 0 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  })

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: user?.name || prev.name,
      email: user?.email || prev.email,
      phone: user?.phone || prev.phone,
      bio: user?.bio || prev.bio
    }))
  }, [user])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [subjectsResponse, tasksResponse] = await Promise.all([
          subjectService.getAllSubjects(),
          taskService.getAllTasks()
        ])

        const subjects = subjectsResponse.data || []
        const tasks = tasksResponse.data || []
        const completedTasks = tasks.filter(task => task.completed).length
        const completion = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

        setStats({
          subjects: subjects.length,
          tasks: tasks.length,
          completion
        })
      } catch {
        setStats({ subjects: 0, tasks: 0, completion: 0 })
      }
    }

    loadStats()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      await updateProfile(formData)
      setIsEditing(false)
    } catch (err) {
      setError(err || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-primary-900 mb-8">Profile</h1>

      <div className="max-w-2xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-lg p-8 mb-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                <User size={48} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{formData.name}</h2>
                <p className="text-white/80 mt-1">{formData.email}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">Active Student</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Live Account</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition border border-white/30"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{stats.subjects}</div>
            <p className="text-gray-600 text-sm mt-2">Subjects</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600">{stats.tasks}</div>
            <p className="text-gray-600 text-sm mt-2">Tasks</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completion}%</div>
            <p className="text-gray-600 text-sm mt-2">Completion</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Profile Information</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setError('')
                  }}
                  className="btn-outline flex-1"
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <User size={24} className="text-primary-600" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Full Name</p>
                  <p className="text-gray-800 font-medium">{formData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail size={24} className="text-secondary-600" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Email Address</p>
                  <p className="text-gray-800 font-medium">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Award size={24} className="text-amber-600" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Academic Status</p>
                  <p className="text-gray-800 font-medium">Active Student</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Calendar size={24} className="text-green-600" />
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">Member Since</p>
                  <p className="text-gray-800 font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined'}
                  </p>
                </div>
              </div>

              {formData.bio && (
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-gray-600 text-sm mb-2">Bio</p>
                  <p className="text-gray-800">{formData.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h3>

          <div className="space-y-4">
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
              <span className="font-medium text-gray-800">Change Password</span>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition flex justify-between items-center">
              <span className="font-medium text-gray-800">Privacy Settings</span>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full p-4 text-left border border-red-200 rounded-lg hover:bg-red-50 transition flex justify-between items-center">
              <span className="font-medium text-red-600">Delete Account</span>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
