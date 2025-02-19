import React from "react";
import { FaPlay, FaShoppingCart, FaDownload } from "react-icons/fa";
import Navbar from "./Navbar";
const Mainpage = () => {
  return (
    <>
    
    <Navbar />
    <div className="text-white px-10 py-10">
    {/* Search Bar */}  
    
    <div className="flex justify-center">
      <div className="flex items-center bg-gray-900 p-2 rounded-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-1 p-2 outline-none bg-transparent text-white placeholder-gray-400"
        />
        <button className="bg-blue-700 px-4 py-2 text-white font-semibold rounded-md">
          Search
        </button>
      </div>
    </div>



  </div>
  </>
  )
}

export default Mainpage