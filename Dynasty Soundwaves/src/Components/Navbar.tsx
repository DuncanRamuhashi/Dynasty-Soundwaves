import React from "react";
import logo from "../assets/ddddd-removebg-preview.png";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4  text-gray-900">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-14 w-auto" />


      {/* Search Bar & Icons */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for a track..."
            className="px-4 py-2 rounded-md text-black"
          />
          <FaSearch className="absolute top-2.5 right-3 text-gray-500 cursor-pointer" />
        </div>
        <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
        <span className="text-sm">$0.00</span>
        <FaUser className="text-xl cursor-pointer hover:text-gray-400" />
      </div>
    </nav>
  );
};

export default Navbar;
