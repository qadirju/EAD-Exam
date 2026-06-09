import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Menu size={24} className="text-primary-600 cursor-pointer" />
          </div>
          <Link to="/dashboard" className="block">
            <h1 className="text-xl font-bold text-primary-900">SSSP</h1>
            <p className="text-xs text-gray-500">Smart Study Planer</p>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800">{user?.name || 'Student'}</span>
            {user?.email && <span className="text-xs text-gray-500">{user.email}</span>}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User size={16} className="text-primary-600" />
              </div>
              {/* Desktop Only */}
              <div className="hidden md:block text-gray-600">
                <svg
                  className={`w-5 h-5 transition ${showMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg flex items-center gap-2 text-sm"
                >
                  <User size={16} />
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 last:rounded-b-lg flex items-center gap-2 text-sm border-t border-gray-200"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
