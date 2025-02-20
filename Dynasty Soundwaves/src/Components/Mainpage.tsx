import React from "react";
import { FaPlay,FaPause, FaShoppingCart, FaDownload,FaArrowDown } from "react-icons/fa";
import Navbar from "./Navbar";
const Mainpage = () => {
  return (
    <>
    
    <Navbar />
    <div className="text-gray-100 px-10 py-10">
    {/* Search Bar */}  

    <div className="flex justify-center">
      <div className="flex items-center bg-gray-900 p-2 rounded-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-1 p-2 outline-none bg-transparent text-gray-100 placeholder-gray-400 "
        />
        <button className="bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-gray-100 font-semibold rounded-md">
          Search
        </button>
      </div>
    </div>

          {/* Filter things */}  
    <div className=" flex py-14 px-52">
        <div className="text-gray-800">
            <p> </p>
            <FaArrowDown className=""/>
        </div>

    </div>

    

  </div>
  </>
  )
}

export default Mainpage