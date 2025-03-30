import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import Sidebar from "./Sidebar";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empDetails, setEmpDetails] = useState({});
  const [workList, setWorkList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const logOut = () => {
    navigate("/");
  };

  const deleteTask = async (taskID) => {
    try {
      const res = await axios.post("http://localhost:3000/work/deleteOneTask", {
        id: taskID,
      });

      if (res.data.status) {
        toast.success("Task deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [userRes, workRes] = await Promise.all([
        axios.post("http://localhost:3000/user/getUserById", { id }),
        axios.post("http://localhost:3000/work/getWorkById", { id }),
      ]);

      if (userRes.data.status && workRes.data.status) {
        setEmpDetails(userRes.data.data[0] || {});
        setWorkList(workRes.data.data || []);
      } else {
        toast.error("Failed to fetch employee details or tasks");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-10 py-8">
      <Sidebar />
      <header className="flex justify-between items-center mb-8 ml-64">
        <h1 className="text-4xl font-bold text-blue-400">
          {empDetails.empName || "Loading..."}
        </h1>
        <button
          onClick={logOut}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
        >
          Log Out
        </button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ml-64">
        {[
          { label: "New Tasks", value: empDetails.newTask, color: "bg-blue-500" },
          { label: "Active Tasks", value: empDetails.acttask, color: "bg-green-500" },
          { label: "Completed Tasks", value: empDetails.completedTask, color: "bg-yellow-500" },
          { label: "Failed Tasks", value: empDetails.failed, color: "bg-red-500" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${stat.color} text-center`}
          >
            <p className="text-3xl font-bold text-white">{stat.value || 0}</p>
            <p className="text-lg font-medium text-white mt-2">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12 ml-64">
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Task List</h2>
        {isLoading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : workList.length === 0 ? (
          <p className="text-gray-400">No tasks available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workList.map((task, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
              >

                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md">
                    {task.category}
                  </span>
                  <span className="text-gray-400 text-sm">{task.date}</span>
                </div>


                <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                <p className="text-gray-300 mb-4">{task.work}</p>


                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${task.status === "Completed"
                        ? "text-green-400"
                        : task.status === "Failed"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                  >
                    {task.status}
                    {console.log(!(task.status === "Pending"))}

                  </span>
                  <button
                    disabled={!(task.status === "Pending")}
                    onClick={() => {
                      deleteTask(task._id)
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default EmployeeDetails;
