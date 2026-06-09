import React from 'react'
import { CheckCircle, Circle } from 'lucide-react'

const TaskCard = ({ task, onToggle }) => {
  const subjectName = task.subject?.name || task.subject || 'No Subject'
  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'

  return (
    <div className="card flex items-start gap-4">
      <button
        onClick={() => onToggle(task._id)}
        className="mt-1 text-primary-600 hover:text-primary-700 transition"
      >
        {task.completed ? (
          <CheckCircle size={24} className="fill-current" />
        ) : (
          <Circle size={24} />
        )}
      </button>
      <div className="flex-1">
        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{task.description || 'No description'}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full">
            {subjectName}
          </span>
          <span className={`text-sm font-medium ${
            task.priority === 'high' ? 'text-red-600' :
            task.priority === 'medium' ? 'text-amber-600' : 'text-green-600'
          }`}>
            {task.priority?.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            Due: {formattedDate}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
