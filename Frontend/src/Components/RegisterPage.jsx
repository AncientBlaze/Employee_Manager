import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const validateInputs = (username, password, confirmPassword) => {
  if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
    toast.error("Please fill all the fields!");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return false;
  }

  return true;
};

const registerUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:3000/user/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const InputField = ({ type, value, onChange, placeholder, icon }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const ActionButton = ({ onClick, children, variant = "primary", disabled }) => {
  const baseClasses = "w-full py-3 rounded-lg text-sm font-medium transition-all duration-300";
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    secondary: "text-blue-600 hover:text-blue-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!validateInputs(userName, password, confirmPassword)) return;

    setIsLoading(true);
    try {
      const registerResponse = await registerUser(userName, password);

      if (registerResponse.success) {
        setTimeout(() => navigate("/login"), 2000);
        toast.success("User Created Successfully!");
      } else {
        toast.error("User Not Created!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordIcon = <i className="fas fa-lock text-gray-500"></i>;
  const userIcon = <i className="fas fa-user text-gray-500"></i>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Please enter your credentials to register</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <InputField
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter User Name"
              icon={userIcon}
            />

            <div className="relative mb-6">
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                icon={passwordIcon}
              />
              <i
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${showPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
            </div>

            <div className="relative mb-6">
              <InputField
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                icon={passwordIcon}
              />
              <i
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${showPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
            </div>

            <div className="space-y-4">
              <ActionButton onClick={handleRegister} disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </ActionButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

