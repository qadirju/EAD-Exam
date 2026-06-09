import React from 'react'
import { Link } from 'react-router-dom'
import { Home, BookOpen, CheckSquare, User } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-primary-900 text-white shadow-lg">
      <div className="p-6 border-b border-primary-800">
        <h2 className="text-2xl font-bold">SSSP</h2>
        <p className="text-primary-200 text-sm">Smart Study Planer</p>
      </div>
      
      <nav className="mt-8 px-4 space-y-2">
        <NavLink to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <NavLink to="/subjects" icon={<BookOpen size={20} />} label="Subjects" />
        <NavLink to="/tasks" icon={<CheckSquare size={20} />} label="Tasks" />
        <NavLink to="/profile" icon={<User size={20} />} label="Profile" />
      </nav>
    </aside>
  )
}

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-800 transition-colors"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
)

export default Sidebar
