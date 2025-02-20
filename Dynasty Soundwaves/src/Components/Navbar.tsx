import React, { useState } from "react";
import logo from "../assets/ddddd-removebg-preview.png";
import { FaSearch, FaShoppingCart, FaRegUser, FaUser } from "react-icons/fa";

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState("user"); // Default to 'user'

    return (
        <nav className="flex items-center justify-between px-8 py-4 text-gray-900">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-14 w-auto" />

            {/* Search Bar & Icons */}
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search for a track..."
                        className="px-4 py-2 rounded-md text-black border border-gray-300"
                    />
                    <FaSearch className="absolute top-2.5 right-3 text-gray-500 cursor-pointer" />
                </div>
                <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
                <span className="text-sm">$0.00</span>

                {/* User Icon & Logout Button */}
                {isLoggedIn ? (
                    <div className="flex items-center space-x-3">
                        <FaUser className="text-xl cursor-pointer hover:text-gray-400" />
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            onClick={() => setIsLoggedIn(false)}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <FaRegUser
                        className="text-xl cursor-pointer hover:text-gray-400"
                        onClick={() => setIsLoginOpen(true)}
                    />
                )}
            </div>

            {/* Login Modal */}
            {isLoginOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsLoginOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-lg font-bold mb-4">Login</h2>
                        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" />
                        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" />
                        <button
                            className="bg-blue-500 text-white w-full py-2 rounded"
                            onClick={() => {
                                setIsLoggedIn(true);
                                setIsLoginOpen(false);
                            }}
                        >
                            Login
                        </button>
                        <p className="text-sm mt-2">
                            Don't have an account?{" "}
                            <span
                                className="text-gray-900 cursor-pointer"
                                onClick={() => {
                                    setIsLoginOpen(false);
                                    setIsRegOpen(true);
                                }}
                            >
                                Register
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {isRegOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsRegOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-lg font-bold mb-4">Register</h2>

                        {/* User Type Dropdown */}
                        <select
                            className="w-full p-2 border rounded mb-2"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="user">Register as User</option>
                            <option value="seller">Register as Seller</option>
                        </select>

                        <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-2" />
                        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" />
                        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" />

                        <button className="bg-gray-900 text-white w-full py-2 rounded">
                            Register as {userType === "seller" ? "Seller" : "User"}
                        </button>

                        <p className="text-sm mt-2">
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() => {
                                    setIsRegOpen(false);
                                    setIsLoginOpen(true);
                                }}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
