import React, { useEffect, useState } from 'react'
import { BarChart3, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'
import subjectService from '../services/subjectService'
import taskService from '../services/taskService'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  })
  const [recentTasks, setRecentTasks] = useState([])
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError(null)

        const [subjectsResponse, tasksResponse] = await Promise.all([
          subjectService.getAllSubjects(),
          taskService.getAllTasks()
        ])

        const subjects = subjectsResponse.data || []
        const tasks = tasksResponse.data || []

        const completedTasks = tasks.filter(task => task.completed)
        const pendingTasks = tasks.filter(task => !task.completed)

        const sortedByDueDate = [...tasks]
          .filter(task => task.dueDate)
          .sort((left, right) => new Date(left.dueDate) - new Date(right.dueDate))

        setStats({
          totalSubjects: subjects.length,
          totalTasks: tasks.length,
          completedTasks: completedTasks.length,
          pendingTasks: pendingTasks.length
        })

        setRecentTasks([...tasks]
          .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0))
          .slice(0, 3))
        setUpcomingTasks(sortedByDueDate.slice(0, 4))
      } catch (err) {
        setError(err || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const completionRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-md p-10 text-center text-gray-600">
          Loading your latest subjects and tasks...
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your academic overview</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BarChart3 size={28} />}
          title="Total Subjects"
          value={stats.totalSubjects}
          bgColor="bg-primary-50"
          iconColor="text-primary-600"
          trend="+2 this semester"
        />
        <StatCard
          icon={<Calendar size={28} />}
          title="Total Tasks"
          value={stats.totalTasks}
          bgColor="bg-secondary-50"
          iconColor="text-secondary-600"
          trend="+5 this week"
        />
        <StatCard
          icon={<CheckCircle2 size={28} />}
          title="Completed"
          value={stats.completedTasks}
          bgColor="bg-green-50"
          iconColor="text-green-600"
          trend={`${completionRate}% completion rate`}
        />
        <StatCard
          icon={<AlertCircle size={28} />}
          title="Pending"
          value={stats.pendingTasks}
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
          trend={stats.pendingTasks > 0 ? 'Due soon' : 'All caught up'}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary-900">Recent Tasks</h2>
              <a href="/tasks" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                View All →
              </a>
            </div>
            <div className="space-y-4">
              {recentTasks.length > 0 ? recentTasks.map((task) => {
                const subjectName = task.subject?.name || 'No Subject'
                const dueText = task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'No due date'

                return (
                  <div key={task._id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <input type="checkbox" checked={task.completed} readOnly className="w-5 h-5 rounded text-primary-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-gray-600 text-sm">Due {dueText}</p>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {subjectName}
                    </span>
                  </div>
                )
              }) : (
                <p className="text-sm text-gray-500">No tasks yet. Create one to see it here.</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingTasks.length > 0 ? upcomingTasks.map((task) => {
                const dueDate = task.dueDate ? new Date(task.dueDate) : null
                const dueLabel = dueDate ? dueDate.toLocaleDateString() : 'No due date'

                return (
                  <div key={task._id} className="pb-4 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{task.title}</h3>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">
                        {dueLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{task.subject?.name || 'No Subject'}</p>
                  </div>
                )
              }) : (
                <p className="text-sm text-gray-500">No upcoming deadlines.</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-md p-6 text-white">
            <h3 className="font-bold mb-4">This Week's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-primary-100">Tasks Completed</span>
                <span className="font-bold">{stats.completedTasks} / {stats.totalTasks}</span>
              </div>
              <div className="w-full bg-primary-500 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value, bgColor, iconColor, trend }) => (
  <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`${iconColor} opacity-80`}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <p className="text-gray-600 text-sm mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
)

export default Dashboard
