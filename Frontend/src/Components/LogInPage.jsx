import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogInPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const adminDetails = {
    userName: "admin",
    password: "admin",
  };

  const logInEmployee = async () => {
    if (userName === "" || password === "") {
      toast.error("Please fill all the fields !");
      return;
    }

    if (
      userName === adminDetails.userName &&
      password === adminDetails.password
    ) {
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
      return;
    }

    const userDetails = {
      username: userName,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:2525/user/login",
        userDetails
      );

      if (res.data.status === true) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate(`/employee/${res.data.data._id}`);
        }, 2000);
      } else {
        toast.error("User Not Found !");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="w-[30%] h-auto flex flex-col gap-10 p-14 border-2 border-green-500 rounded-xl">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter User Name"
          className="px-5 py-3 rounded-full border-none outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="px-5 py-3 rounded-full border-none outline-none"
        />
        <button
          onClick={logInEmployee}
          className="text-white bg-green-500 py-3 rounded-full text-2xl font-medium"
        >
          Log In
        </button>
        <button
          className="text-green-500"
          onClick={() => navigate("/addEmployee")}
        >
          Sign Up
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogInPage;
