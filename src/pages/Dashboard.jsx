import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
        <button
          onClick={() => navigate('/')}
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
            <p className="text-3xl font-bold text-gray-800">12</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-yellow-500">5</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-500">7</p>
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