import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Employees() {
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        empName: "",
        username: "",
        password: ""
    });

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

    const handleSubmit = async (e) => {
        try {
            axios.post("http://localhost:3000/user/addEmployee", formData)
                .then((res) => {
                    res.data.status === 200 ? toast.success("Employee added successfully") : toast.error("Failed to add employee");
                    setIsModalOpen(false);
                })
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("Failed to add employee");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
            <Sidebar />
            <main className="flex-1 p-8 ml-64">
                <h1 className="text-3xl font-bold text-white">Employees</h1>
                <p className="text-gray-400 mt-2">Manage all employees here.</p>
                <div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Add Employee
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">Employee List</h2>
                    <div className="bg-gray-800 rounded-lg p-4">
                        {allUser.length > 0 ? (
                            <ul className="space-y-4 gap-1 flex flex-col">
                                {allUser.map((user) => (
                                    <Link key={user._id} to={`/employeeDetails/${user._id}`}>
                                        <li
                                            key={user._id}
                                            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                                        >
                                            <div>
                                                <p className="text-lg font-medium">{user.empName}</p>
                                                <p className="text-gray-400 text-sm">{user.email}</p>
                                            </div>
                                            <p className="text-gray-300">{user.position}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No employees found.</p>
                        )}
                    </div>
                </div>
            </main>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-96">
                        <h2 className="text-2xl font-bold text-white mb-4">Add Employee</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Employee Name</label>
                                <input
                                    type="text"
                                    name="empName"
                                    value={formData.empName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter employee name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter Username"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">User Password</label>
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                >
                                    Add Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Employees;