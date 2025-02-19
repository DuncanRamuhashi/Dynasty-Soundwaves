import React from "react";
import { FaPlay, FaShoppingCart, FaDownload } from "react-icons/fa";
const Mainpage = () => {
  return (
    <div className="text-white px-6 py-10">
    {/* Search Bar */}
    <div className="flex justify-center">
      <div className="flex items-center bg-gray-800 p-2 rounded-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="What type of track are you looking for?"
          className="flex-1 p-2 outline-none bg-transparent text-white placeholder-gray-400"
        />
        <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md">
          Search
        </button>
      </div>
    </div>

    {/* Featured Track */}
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">🔥 Featured Track</h2>
      <div className="flex items-center justify-between mt-4">
        <div>
          <h3 className="text-lg">"Goodbye" - Acoustic SZA x HER Type Beat</h3>
          <p className="text-gray-400">BPM: 106 | Genre: Acoustic</p>
        </div>
        <button className="bg-blue-500 p-3 rounded-full">
          <FaPlay className="text-white" />
        </button>
      </div>
    </div>

    {/* Track List */}
    <div className="mt-8">
      <h2 className="text-xl font-bold">🎵 Latest Tracks</h2>
      <div className="mt-4 space-y-4">
        {/* Track Item */}
        <div className="bg-gray-800 p-4 flex justify-between items-center rounded-lg">
          <div>
            <h3 className="text-lg">"Nobody" - Acoustic SZA x Jhene Aiko Type Beat</h3>
            <p className="text-gray-400">Time: 02:44 | BPM: 113</p>
          </div>
          <div className="flex space-x-4">
            <FaDownload className="text-gray-400 cursor-pointer hover:text-white" />
            <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md flex items-center space-x-2">
              <FaShoppingCart />
              <span>$39.95</span>
            </button>
          </div>
        </div>

        {/* Another Track */}
        <div className="bg-gray-800 p-4 flex justify-between items-center rounded-lg">
          <div>
            <h3 className="text-lg">"Prayed" - Acoustic SZA x Jhene Aiko Type Beat</h3>
            <p className="text-gray-400">Time: 03:15 | BPM: 70</p>
          </div>
          <div className="flex space-x-4">
            <FaDownload className="text-gray-400 cursor-pointer hover:text-white" />
            <button className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md flex items-center space-x-2">
              <FaShoppingCart />
              <span>$39.95</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Mainpage