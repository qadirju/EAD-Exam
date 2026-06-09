import React from 'react'

const SubjectCard = ({ subject }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-primary-900">{subject.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{subject.code}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-secondary-600">{subject.tasks}</p>
          <p className="text-gray-600 text-xs">Tasks</p>
        </div>
      </div>
      <p className="text-gray-700 mt-3 text-sm">{subject.description}</p>
    </div>
  )
}

export default SubjectCard
