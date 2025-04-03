import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar.jsx';

function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    assignTo: "",
  });
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/getAllUser");
      setAllUser(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = async () => {
    if (!formData.title || !formData.assignTo) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/work/insert", {
        title: formData.title,
        date: formData.date,
        assignTo: formData.assignTo,
        category: formData.category,
        work: formData.description,
      });

      if (res.data.status) {
        const updateRequests = [
          axios.post("http://localhost:3000/user/updateNewTask", {
            id: formData.assignTo,
            taskType: "acttask",
            operation: "increase",
          }),
          axios.post("http://localhost:3000/user/updateNewTask", {
            id: formData.assignTo,
            taskType: "newTask",
            operation: "increase",
          }),
        ];

        await Promise.all(updateRequests);
        toast.success("Task Created Successfully");
        setFormData({ title: "", description: "", date: "", category: "", assignTo: "" });
        fetchAllUser();
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      toast.error("Failed to create task");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-400">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2 text-lg">Manage tasks and employee activities efficiently</p>
          </div>
        </header>
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-green-400">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-300 mb-2">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 mb-2">Due Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-300 mb-2">Assign To</label>
                <select
                  name="assignTo"
                  value={formData.assignTo}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Select Employee</option>
                  {allUser.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.empName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="block text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="form-group flex-1">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                  placeholder="Task description..."
                />
              </div>
              <button
                onClick={createTask}
                disabled={isLoading}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? "Creating Task..." : "Create Task"}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-blue-400">Employee Statistics</h2>
          <div className="grid grid-cols-6 gap-4 mb-4 px-4 py-3 bg-gray-700 rounded-lg">
            <div className="text-gray-300 font-medium">Employee Name</div>
            <div className="text-center text-gray-300 font-medium">New Tasks</div>
            <div className="text-center text-gray-300 font-medium">Active Tasks</div>
            <div className="text-center text-gray-300 font-medium">Completed</div>
            <div className="text-center text-gray-300 font-medium">Failed</div>
            <div className="text-center text-gray-300 font-medium">Actions</div>
          </div>

          <div className="space-y-3">
            {allUser.map((emp) => (
              <div
                key={emp._id}
                className="grid grid-cols-6 gap-4 items-center px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="font-medium">{emp.empName}</div>
                <div className="text-center text-green-400">{emp.newTask}</div>
                <div className="text-center text-yellow-400">{emp.acttask}</div>
                <div className="text-center text-blue-400">{emp.completedTask}</div>
                <div className="text-center text-red-400">{emp.failed}</div>
                <div className="text-center">
                  <button
                    onClick={() => navigate(`/employeeDetails/${emp._id}`)}
                    className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default Dashboard;
