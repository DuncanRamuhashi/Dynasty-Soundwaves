import React, { use, useState } from "react";
import { FaSearch, FaShoppingCart, FaRegUser, FaUser, FaRegListAlt, FaListAlt, FaMoneyBillWave, FaPeopleCarry,FaUpload,FaBook,FaMusic,FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ddddd-removebg-preview.png";
interface User {
    name: string;
    email: string;
    password:string,
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
  const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [userType, setUserType] = useState("user");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const [inputEmail,setInputEmail] = useState("");
    const [user,setUser] = useState<User>();
    const handleLogin = async () => {
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
            setUser(data.user); // This sets the user object from the 
            // Store user data in sessionStorage
           sessionStorage.setItem('user', JSON.stringify(data.user));
          } else {
            if(data.message === "Please verify your email address."){
                setIsOtpOpen(true);
                setIsOtpSent(true);
            }
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
          alert("Login failed, please try again");
        }
      };

    const handleOtpVerification = async () => {
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
                setIsLoggedIn(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("OTP verification failed");
        }
    };

    const handleRegistration = async () => {
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
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed, please try again");
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email,otp }),
            });
            const data = await response.json();

            if (data.success) {
                alert("OTP resent successfully!", );
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
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
                sessionStorage.removeItem('user');
                alert("User is Out", );
                setIsLoggedIn(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error Logging out");
        }
    };
  
    return (
        <nav className="flex items-center justify-between px-8 py-4 text-gray-900">
            {/* Logo */}
            <Link to="/home">
                <img src={logo} alt="Logo" className="h-14 w-auto" />
            </Link>

            {/* Search Bar & Icons */}
            <div className="flex items-center space-x-4">
 
       
 { storedUser?.role === "user" ? ( <>

    <Link to="/cart" className="relative">
      <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
      <span className="absolute -top-4 -right-3 bg-gray-900 hover:text-gray-400 text-gray-100 text-xs font-bold px-2 py-1 rounded-full">
        5
      </span>
    </Link>
    <span className="text-sm">R0.00</span>
    </>
  ) : (
    <></>
  )
}
{  storedUser?.role  === "user" ? ( <>
                <Link to='/usereport'>
                    <FaRegListAlt />
                </Link>
                </>
  ) : (
    <></>
  )
}
                {/* Seller and admin links */}
                { user?.role === "admin" ? ( <>
                <Link to='/allreport'>
                    <FaListAlt />
                </Link>
                </>
  ) : (
    <></>
  )
}
{  storedUser?.role  === "admin" ? ( <>
                <Link to='/payments'>
                    <FaMoneyBillWave />
                </Link>
                </>
  ) : (
    <></>
  )
}
{  storedUser?.role  === "admin" ? ( <>
                <Link to='/members'>
                    <FaPeopleCarry />
                </Link>
                </>
  ) : (
    <></>
  )
}
{  storedUser?.role  === "seller" ? ( <>
                <Link to='/upload'>
                    <FaUpload />
                </Link>
                </>
  ) : (
    <></>
  )
}
{  storedUser?.role  === "admin" ? ( <>
                <Link to='/termsandcondition'>
                    <FaBook />
                </Link>
                </>
  ) : (
    <></>
  )
}
                {  storedUser?.role  === "seller" ? ( <>
                <Link to='/artistmusic'>
                    <FaMusic/>
                </Link>
                </>
  ) : (
    <></>
  )
}
  
               

                {/* User Icon & Logout Button */}
                {isLoggedIn ? (
                    <div className="flex items-center space-x-3">
                        <Link to='/profile'>
                            <FaUser className="text-xl cursor-pointer hover:text-gray-400" />
                        </Link>

                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsLoginOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-lg font-bold mb-4">Login</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <p className="text-sm text-blue-500 cursor-pointer text-right mb-4 hover:underline">
                            Forgot Password?
                        </p>

                        <button
                            className="bg-gray-900 text-white w-full py-2 rounded"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p className="text-sm mt-2">
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsRegOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-lg font-bold mb-4">Register</h2>

                        <select
                            className="w-full p-2 border rounded mb-2"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="user">Register as User</option>
                            <option value="seller">Register as Seller</option>
                        </select>
                        <input
                            type="Name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <button
                            className="bg-gray-900 text-white w-full py-2 rounded"
                            onClick={handleRegistration}
                        >
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

            {/* OTP Modal */}
            {isOtpOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
                            onClick={() => setIsOtpOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-lg font-bold mb-4">OTP Verification</h2>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <button
                            className="bg-gray-900 text-white w-full py-2 rounded"
                            onClick={handleOtpVerification}
                        >
                            Verify OTP
                        </button>

                        {isOtpSent && (
                            <button
                                className="text-blue-500 mt-2 text-sm"
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
