import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, BookOpen, Loader2 } from 'lucide-react'
import SubjectCard from '../components/SubjectCard'
import subjectService from '../services/subjectService'

const Subjects = () => {
  const [subjects, setSubjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingSubjectId, setEditingSubjectId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    instructor: '',
    credits: 3
  })

  // Fetch subjects on mount
  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await subjectService.getAllSubjects()
      setSubjects(data.data || [])
    } catch (err) {
      setError(err || 'Failed to load subjects')
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubject = async (e) => {
    e.preventDefault()
    if (formData.name && formData.code) {
      try {
        if (editingSubjectId) {
          const updatedSubject = await subjectService.updateSubject(editingSubjectId, formData)
          setSubjects(subjects.map(subject => subject._id === editingSubjectId ? updatedSubject.data : subject))
        } else {
          const newSubject = await subjectService.createSubject(formData)
          setSubjects([...subjects, newSubject.data])
        }
        setFormData({ name: '', code: '', description: '', instructor: '', credits: 3 })
        setShowModal(false)
        setEditingSubjectId(null)
      } catch (err) {
        setError(err || (editingSubjectId ? 'Failed to update subject' : 'Failed to create subject'))
      }
    }
  }

  const openCreateModal = () => {
    setEditingSubjectId(null)
    setFormData({ name: '', code: '', description: '', instructor: '', credits: 3 })
    setShowModal(true)
  }

  const openEditModal = (subject) => {
    setEditingSubjectId(subject._id)
    setFormData({
      name: subject.name || '',
      code: subject.code || '',
      description: subject.description || '',
      instructor: subject.instructor || '',
      credits: subject.credits || 3
    })
    setShowModal(true)
  }

  const handleDeleteSubject = async (id) => {
    try {
      await subjectService.deleteSubject(id)
      setSubjects(subjects.filter(s => s._id !== id))
    } catch (err) {
      setError(err || 'Failed to delete subject')
    }
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
          <h1 className="text-4xl font-bold text-primary-900">Subjects</h1>
          <p className="text-gray-600 mt-2">Manage your academic subjects</p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      {/* Subjects Grid */}
      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject._id} className="relative">
              <SubjectCard subject={subject} />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => openEditModal(subject)}
                  className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <Edit2 size={16} className="text-primary-600" />
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject._id)}
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
            <BookOpen size={32} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Subjects Yet</h2>
          <p className="text-gray-600 mb-6">Create your first subject to get started</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create Subject
          </button>
        </div>
      )}

      {/* Add Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingSubjectId ? 'Edit Subject' : 'Add New Subject'}
            </h2>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Mathematics"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., MATH101"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="input-field"
                  placeholder="Subject description..."
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Instructor name"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Credits
                </label>
                <select
                  className="input-field"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingSubjectId(null)
                    setFormData({ name: '', code: '', description: '', instructor: '', credits: 3 })
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingSubjectId ? 'Update Subject' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Subjects
