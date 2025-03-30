import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function TaskSection() {
  const [Tasks, setTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/work/getAllWork");
      setTasks(response.data.data);
      setFilteredTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch tasks");
      setLoading(false);
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredTasks(Tasks);
    } else {
      setFilteredTasks(Tasks?.filter((task) => task.status === filter));
    }
  }, [filter, Tasks]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
        <p className="text-gray-400 mt-2">Manage all tasks here.</p>
        <div className="mt-4">
          <div className="flex items-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${filter === "All" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${filter === "Completed" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${filter === "Pending" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-400">Loading tasks...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks?.map((task) => (
                <div
                  key={task._id}
                  className="group p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform border border-gray-700 hover:border-gray-600"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        {task.work}
                      </h3>
                      <span className="px-3 py-1 text-sm font-semibold text-cyan-100 bg-cyan-800 rounded-full bg-opacity-50">
                        {task.category}
                      </span>
                    </div>

                    <p className="text-lg font-medium text-gray-100 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {task.title}
                    </p>

                    <div className="grid grid-cols-1 gap-4 text-gray-300">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="truncate">Assigned to: {task.assignTo}</span>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(task.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${task.status === 'Completed'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-yellow-900 text-yellow-300'
                        }`}>
                        {task.status}
                      </span>
                      <button className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default TaskSection;