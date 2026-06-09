import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CheckSquare, BarChart3, Clock, ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-lg p-12 mb-12 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Smart Study Planer</h1>
        <p className="text-lg text-white/90 mb-6 max-w-2xl">
          Your personal academic assistant designed to help you manage subjects, tasks, and deadlines efficiently.
          Stay organized, track progress, and achieve your academic goals.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/subjects" className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
            Get Started <ArrowRight size={20} />
          </Link>
          <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition">
            Learn More
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<BookOpen size={32} />}
          title="Your Subjects"
          value="Synced"
          description="Pulls from your account"
          color="primary"
        />
        <StatCard
          icon={<CheckSquare size={32} />}
          title="Total Tasks"
          value="Managed"
          description="Stored per account"
          color="secondary"
        />
        <StatCard
          icon={<Clock size={32} />}
          title="Due Soon"
          value="Tracked"
          description="Sorted by deadline"
          color="accent"
        />
        <StatCard
          icon={<BarChart3 size={32} />}
          title="Completion"
          value="Visualized"
          description="Completion updates live"
          color="green"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Use Smart Study Planer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="📚"
            title="Subject Organization"
            description="Keep all your subjects in one place with course codes, instructors, and credits."
          />
          <FeatureCard
            icon="✓"
            title="Task Management"
            description="Create, track, and complete tasks with priorities and due dates."
          />
          <FeatureCard
            icon="📊"
            title="Progress Tracking"
            description="Monitor your academic progress with visual dashboards and statistics."
          />
          <FeatureCard
            icon="🔔"
            title="Smart Reminders"
            description="Never miss a deadline with intelligent reminder notifications."
          />
          <FeatureCard
            icon="🎯"
            title="Priority Management"
            description="Focus on what matters with high, medium, and low priority tasks."
          />
          <FeatureCard
            icon="📈"
            title="Performance Analytics"
            description="Analyze your completion rates and improve your study habits."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <ActionCard
          title="Add Your First Subject"
          description="Start by adding the courses you're currently taking"
          buttonText="Add Subject"
          href="/subjects"
          icon="📖"
        />
        <ActionCard
          title="Create a Task"
          description="Add assignments and deadlines to track your progress"
          buttonText="Add Task"
          href="/tasks"
          icon="✏️"
        />
        <ActionCard
          title="View Dashboard"
          description="Get an overview of your academic workload"
          buttonText="Go to Dashboard"
          href="/dashboard"
          icon="📊"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Tips to Get Started</h3>
        <ul className="space-y-3 text-blue-800">
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">1.</span>
            <span>Add all your current subjects with course codes and instructor details</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Create tasks for all your upcoming assignments and exams</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">3.</span>
            <span>Set priorities for tasks to focus on what's most important</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Mark tasks as complete as you finish them to track progress</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">5.</span>
            <span>Check your dashboard regularly to stay on top of deadlines</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const StatCard = ({ icon, title, value, description, color }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-200',
    secondary: 'bg-secondary-50 text-secondary-600 border-secondary-200',
    accent: 'bg-amber-50 text-amber-600 border-amber-200',
    green: 'bg-green-50 text-green-600 border-green-200'
  }

  return (
    <div className={`${colorClasses[color]} rounded-lg border p-6`}>
      <div className="mb-4">{icon}</div>
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

const ActionCard = ({ title, description, buttonText, href, icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <Link
      to={href}
      className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-2"
    >
      {buttonText} <ArrowRight size={16} />
    </Link>
  </div>
)

export default Home
