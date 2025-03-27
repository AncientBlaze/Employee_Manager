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

  // Fetch employee and task data
  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        axios.post("http://localhost:2525/user/getUserById", { id }),
        axios.post("http://localhost:2525/work/getWorkById", { id }),
      ]);

      const updatedLength = res2.data.data.length;
      setLength(updatedLength);

      console.log(res1.data.data, res2.data.data);

      if (res1.data.status && res2.data.status) {
        setEmpDetails(res1.data.data[0] || {});
        setWorkList(res2.data.data || []);
      }
    } catch (error) {
      console.log("Error from fetchData: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completeTask = async (workID) => {
    const data1 = {
      id,
      taskType: "completedTask",
      operation: "increase",
    };
    const data2 = {
      id,
      taskType: "acttask",
      operation: "decrease",
    };
    const data3 = {
      id: workID,
      status: "Completed",
    };
    console.log(data1, data2);
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.post("http://localhost:2525/user/updateNewTask", data1),
        axios.post("http://localhost:2525/user/updateNewTask", data2),
        axios.post("http://localhost:2525/work/updateStatus", data3),
      ]);
      fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const failedTask = async (workID) => {
    const data1 = {
      id,
      taskType: "failed",
      operation: "increase",
    };
    const data2 = {
      id,
      taskType: "acttask",
      operation: "decrease",
    };
    const data3 = {
      id: workID,
      status: "failed",
    };
    console.log(data1, data2);
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.post("http://localhost:2525/user/updateNewTask", data1),
        axios.post("http://localhost:2525/user/updateNewTask", data2),
        axios.post("http://localhost:2525/work/updateStatus", data3),
      ]);
      fetchData();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  // Log out function
  const logOut = async () => {
    try {
      const res = await axios.post("http://localhost:2525/user/deleteNewTAsk", {
        id,
      });
      console.log(res.data);
      if (res.data.status) {
        navigate("/");
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log("Error from logOut: ", error);
    }
  };

  return (
    <div
      className={`w-full bg-black px-20 py-10 ${
        length == 0 ? "h-screen" : "h-full"
      }`}
    >
      <p className="text-white text-4xl font-semibold">Hello 👋</p>

      <div className="w-full flex justify-between mt-5 font-bold">
        <p className="text-white text-4xl">
          {empDetails.empName || "Employee"}
        </p>
        <button
          onClick={logOut}
          className="px-5 py-3 rounded-lg bg-green-500 text-white text-2xl font-medium border-none outline-none"
        >
          Log Out
        </button>
      </div>

      <div className="w-full flex justify-between items-center mt-20 gap-5">
        {[
          {
            label: "New Task",
            value: empDetails.newTask || 0,
            color: "bg-blue-400",
          },
          {
            label: "Active Task",
            value: empDetails.acttask || 0,
            color: "bg-green-400",
          },
          {
            label: "Completed Task",
            value: empDetails.completedTask || 0,
            color: "bg-yellow-400",
          },
          {
            label: "Failed Task",
            value: empDetails.failed || 0,
            color: "bg-pink-400",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`w-1/4 h-auto ${stat.color} rounded-lg p-10`}
          >
            <p className="mb-5 text-white text-4xl font-medium">{stat.value}</p>
            <p className="text-white text-2xl font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-auto mt-40 flex flex-row overflow-x-auto gap-10 wrapper no-scrollbar">
        {workList.map((task, index) => (
          <div
            key={index}
            className="w-[450px] h-[400px] p-10 rounded-lg bg-pink-400 flex flex-col"
          >
            <div className="w-full flex justify-between mb-5">
              <p className="text-white font-medium p-2 bg-red-600 rounded-md">
                {task.category}
              </p>
              <p className="text-white font-normal">{task.date}</p>
            </div>

            <p className="text-white font-semibold text-3xl">{task.title}</p>
            <p className="text-white font-medium text-2xl mt-5">{task.work}</p>

            <div className="w-full flex justify-between mt-10">
              {task.status === "pending" ? (
                <>
                  <button
                    onClick={() => completeTask(task._id)}
                    className="hover:shadow-myShadow bg-green-400 px-5 py-2 text-white font-medium rounded-md"
                  >
                    Mark as Complete
                  </button>
                  <button
                    onClick={() => failedTask(task._id)}
                    className="hover:shadow-myShadow bg-red-400 px-5 py-2 text-white font-medium rounded-md"
                  >
                    Mark as Failed
                  </button>
                </>
              ) : task.status === "Completed" ? (
                <p className="text-white font-medium">Completed</p>
              ) : (
                <p className="text-white font-medium">Failed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employee;
