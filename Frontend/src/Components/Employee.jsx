import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Employee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empDetails, setEmpDetails] = useState({});
  const [workList, setWorkList] = useState([]);
  const [length, setLength] = useState(0);

  const fetchData = async () => {
    try {
      const [userRes, taskRes] = await Promise.all([
        axios.post("http://localhost:3000/user/getUserById", { id }),
        axios.post("http://localhost:3000/work/getWorkById", { id }),
      ]);

      if (userRes.data.status && taskRes.data.status) {
        setEmpDetails(userRes.data.data[0] || {});
        setWorkList(taskRes.data.data || []);
        setLength(taskRes.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeTask = async (workID) => {
    const data = [
      { id, taskType: "completedTask", operation: "increase" },
      { id, taskType: "acttask", operation: "decrease" },
      { id: workID, status: "Completed" },
    ];

    try {
      await Promise.all([
        axios.post("http://localhost:3000/user/updateNewTask", data[0]),
        axios.post("http://localhost:3000/user/updateNewTask", data[1]),
        axios.post("http://localhost:3000/work/updateStatus", data[2]),
      ]);
      fetchData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const failedTask = async (workID) => {
    const data = [
      { id, taskType: "failed", operation: "increase" },
      { id, taskType: "acttask", operation: "decrease" },
      { id: workID, status: "Failed" },
    ];

    try {
      await Promise.all([
        axios.post("http://localhost:3000/user/updateNewTask", data[0]),
        axios.post("http://localhost:3000/user/updateNewTask", data[1]),
        axios.post("http://localhost:3000/work/updateStatus", data[2]),
      ]);
      fetchData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const logOut = async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/deleteNewTask", { id });
      if (res.data.status) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white px-10 py-8 ${
        length === 0 ? "h-screen" : "h-full"
      }`}
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400 hover:animate-pulse">
          Welcome {" "}
          {empDetails.empName
            ? empDetails.empName.charAt(0).toUpperCase() +
              empDetails.empName.slice(1)
            : "Employee"}
        </h1>
        <button
          onClick={logOut}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all hover:scale-105 transform"
        >
          Log Out
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "New Tasks", value: empDetails.newTask || 0, color: "bg-blue-500" },
          { label: "Active Tasks", value: empDetails.acttask || 0, color: "bg-green-500" },
          { label: "Completed Tasks", value: empDetails.completedTask || 0, color: "bg-yellow-500" },
          { label: "Failed Tasks", value: empDetails.failed || 0, color: "bg-red-500" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${stat.color} text-center hover:shadow-2xl transform hover:scale-105 transition-all`}
          >
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-lg font-medium text-white mt-2">{stat.label}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-6 hover:underline">
          Task List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workList.map((task, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md">
                  {task.category}
                </span>
                <span className="text-gray-400 text-sm">{task.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
              <p className="text-gray-300 mb-4">{task.work}</p>
              <div className="flex justify-end gap-5 items-center">
                {task.status === "pending" ? (
                  <>
                    <button
                      onClick={() => completeTask(task._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm hover:scale-105 transform transition-all"
                    >
                      Mark as Complete
                    </button>
                    <button
                      onClick={() => failedTask(task._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm hover:scale-105 transform transition-all"
                    >
                      Mark as Failed
                    </button>
                  </>
                ) : (
                  <p
                    className={`text-sm font-medium ${
                      task.status === "Completed"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {task.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Employee;
