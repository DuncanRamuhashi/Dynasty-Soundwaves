import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaRegUser, FaUser, FaRegListAlt, FaListAlt, FaMoneyBillWave, FaPeopleCarry, FaUpload, FaBook, FaMusic, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ddddd-removebg-preview.png";

interface User {
    _id:string;
    name: string;
    email: string;
    password: string;
    social?: {
        facebook?: string;
        instagram?: string;
        x?: string;
    };
    bio?: string;
    role?: "user" | "seller" | "admin";
    verifyOtp?: string;
    verifyOtpExpireAt?: number;
    isAccountVerified?: boolean;
    resetOtp?: string;
    resetOtpExpireAt?: number;
    timestamps?: boolean;
}

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [userType, setUserType] = useState<"user" | "seller" | "">("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [cartNumber, setCartNumber] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    
    const navigate = useNavigate();

    // Check if user is logged in on component mount
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null');
        if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
        }
    }, []); // Empty dependency array since this only runs once on mount

    // Fetch cart items
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
        const token = sessionStorage.getItem("token");
        
        if (!storedUser?._id || !token) return;

        const getCart = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cart/get-cart/${storedUser._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const data = await response.json();
                console.log(data.data);
                if (data?.message === "none") {
                    setCartNumber(0);
                } else {
                    setCartNumber(data.data.musicIDS?.length || 0);
                    sessionStorage.setItem('musicIDDS',JSON.stringify(data.data.musicIDS));
               
                
                }
            } catch (error) {
                console.error("Error getting cart:", error);
                alert("An error occurred while fetching cart.");
            }
        };

        getCart();
    }, [isLoggedIn]); // Depend on isLoggedIn to refresh cart when login status changes

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (data.success) {
                setIsLoggedIn(true);
                setIsLoginOpen(false);
                setUser(data.user.user);
                sessionStorage.setItem('user', JSON.stringify(data.user.user));
                sessionStorage.setItem('token', data.token); // Token is already a string
                setEmail("");
                setPassword("");
                console.log(data.user.user);
            } else {
                if (data.message === "Please verify your email address.") {
                    setIsOtpOpen(true);
                    setIsOtpSent(true);
                }
                alert(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed, please try again");
        }
    };

    const handleOtpVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();

            if (data.success) {
                alert("OTP verified successfully!");
                setIsOtpOpen(false);
                setOtp("");
                setIsLoginOpen(true);
                setUser(data.user);
                setEmail("");
                setPassword("");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            alert("OTP verification failed");
        }
    };

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userType) {
            alert("Please select a user type");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role: userType }),
            });
            const data = await response.json();
            
            if (data.success) {
                alert("Registration successful, please check your email for the OTP!");
                setIsRegOpen(false);
                setIsOtpOpen(true);
                setIsOtpSent(true);
                setName("");
                setEmail(""); // Clear email field
                setPassword("");
                setUserType("");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed, please try again");
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            alert("Please enter your email first");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (data.success) {
                alert("OTP resent successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Resend OTP error:", error);
            alert("Error in resending OTP");
        }
    };

    const handleLogOut = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (data.success) {
                sessionStorage.clear(); // Clear all session storage
                setIsLoggedIn(false);
                setUser(null);
                setCartNumber(0);
                alert("Logged out successfully");
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Error logging out");
        }
    };
    return (
        <nav className="flex items-center justify-between px-8 py-4 text-gray-900 bg-white shadow-md">
            {/* Logo */}
            <Link to="/home">
                <img src={logo} alt="Logo" className="h-14 w-auto" />
            </Link>

            {/* Search Bar & Icons */}
            <div className="flex items-center space-x-6">
                {user?.role === "user" && (
                    <>
                        <Link to="/cart" className="relative">
                            <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
                            <span className="absolute -top-4 -right-3 bg-gray-900 text-gray-100 text-xs font-bold px-2 py-1 rounded-full">
                                {cartNumber}
                            </span>
                        </Link>
                        <span className="text-sm">R0.00</span>
                        <Link to='/usereport' className="hover:text-gray-400">
                            <FaRegListAlt className="text-xl" />
                        </Link>
                    </>
                )}

                {user?.role === "admin" && (
                    <>
                        <Link to='/allreport' className="hover:text-gray-400">
                            <FaListAlt className="text-xl" />
                        </Link>
                       
                        <Link to='/members' className="hover:text-gray-400">
                            <FaPeopleCarry className="text-xl" />
                        </Link>
                        <Link to='/termsandcondition' className="hover:text-gray-400">
                            <FaBook className="text-xl" />
                        </Link>
                    </>
                )}

                {user?.role === "seller" && (
                    <>
                        <Link to='/upload' className="hover:text-gray-400">
                            <FaUpload className="text-xl" />
                        </Link>
                        <Link to='/artistmusic' className="hover:text-gray-400">
                            <FaMusic className="text-xl" />
                        </Link>
                        <Link to='/payments' className="hover:text-gray-400">
                            <FaMoneyBillWave className="text-xl" />
                        </Link>
                    </>
                )}

                {/* User Icon & Logout Button */}
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <Link to='/profile' className="hover:text-gray-400">
                            <FaUser className="text-xl" />
                        </Link>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                            onClick={handleLogOut}
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsLoginOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <p className="text-sm text-blue-500 cursor-pointer text-right mb-4 hover:underline">
                                Forgot Password?
                            </p>
                            <button
                                type="submit"
                                className="bg-gray-900 text-white w-full py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-sm mt-3 text-center">
                            Don't have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer hover:underline"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsRegOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4">Register</h2>
                        <form onSubmit={handleRegistration}>
                            <select
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value as "user" | "seller")}
                                required
                            >
                                <option value="">Select User Type</option>
                                <option value="user">Register as User</option>
                                <option value="seller">Register as Seller</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gray-900 text-white w-full py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Register as {userType === "seller" ? "Seller" : "User"}
                            </button>
                        </form>
                        <p className="text-sm mt-3 text-center">
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer hover:underline"
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

            {/* OTP Modal */}
            {isOtpOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsOtpOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                        <form onSubmit={handleOtpVerification}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gray-900 text-white w-full py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Verify OTP
                            </button>
                        </form>
                        {isOtpSent && (
                            <button
                                className="text-sm mt-3 text-blue-500 cursor-pointer hover:underline block mx-auto"
                                onClick={handleResendOtp}
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;