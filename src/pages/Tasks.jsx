import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tasks() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Setup project', status: 'Done' },
    { id: 2, title: 'Build login page', status: 'Done' },
    { id: 3, title: 'Build dashboard', status: 'In Progress' },
    { id: 4, title: 'Build tasks page', status: 'In Progress' },
    { id: 5, title: 'Connect backend', status: 'To Do' },
  ])

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-blue-500 hover:text-blue-700 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>

        {/* Task List */}
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow px-6 py-4 flex justify-between items-center"
            >
              <p className="text-gray-800 font-medium">{task.title}</p>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full
                ${task.status === 'Done' ? 'bg-green-100 text-green-600' : ''}
                ${task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' : ''}
                ${task.status === 'To Do' ? 'bg-gray-100 text-gray-600' : ''}
              `}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}