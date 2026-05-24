import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5000'

export default function Dashboard() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    axios.get(`${API}/api/tasks`, config)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err))
  }, [])

  const total = tasks.length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const completed = tasks.filter(t => t.status === 'Done').length

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/')
          }}
          className="text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back! 👋</h2>
        <p className="text-gray-500 mb-6">Here's what's happening with your tasks today.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800">{total}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-yellow-500">{inProgress}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-500">{completed}</p>
          </div>
        </div>

        {/* Go to Tasks Button */}
        <button
          onClick={() => navigate('/tasks')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View All Tasks →
        </button>
      </div>

    </div>
  )
}