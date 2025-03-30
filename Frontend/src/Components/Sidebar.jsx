import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 h-screen p-6 border-r border-gray-700 fixed left-0 top-0">
            
            <div className="flex items-center mb-8 space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                </div>
                <div>
                    <p className="text-white font-semibold">Admin User</p>
                    <p className="text-xs text-gray-400">Administrator</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-4 border-b border-gray-700">
                Admin Panel
            </h2>

            <nav className="space-y-2 relative h-[calc(100vh-220px)]">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
                >
                    <i className="fas fa-chart-pie text-lg w-6"></i>
                    <span>Dashboard</span>
                </button>

                <button
                    onClick={() => navigate("/tasks")}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
                >
                    <i className="fas fa-tasks text-lg w-6"></i>
                    <span>Tasks</span>
                </button>

                <button
                    onClick={() => navigate("/employees")}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
                >
                    <i className="fas fa-users text-lg w-6"></i>
                    <span>Employees</span>
                </button>

                <div className="absolute bottom-0 w-full">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-xl transition-all duration-300"
                    >
                        <i className="fas fa-sign-out-alt text-lg w-6"></i>
                        <span>Log Out</span>
                    </button>
                </div>
            </nav>
        </aside>
    )
}
