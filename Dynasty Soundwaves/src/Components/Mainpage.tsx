import React, { useState } from "react";
import { FaArrowDown, FaShoppingCart } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Player from "../Cards/Player";

const Mainpage = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBPM, setSelectedBPM] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleFilterChange = (setter: any) => (event: any) => {
    setter(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="text-gray-100 px-10 py-10">
        {/* Filter and Search Bar */}
        <div className="flex justify-center py-14">
          {/* Filter Section Code... */}
        </div>

        {/* Music Table */}
        <div className="flex flex-col bg-gray-900 py-5 px-5 mx-52 rounded-lg shadow-lg">
          <div className="flex bg-gray-800 text-gray-100 font-semibold">
            <div className="w-1/5 p-4 text-center">TITLE</div>
            <div className="w-1/5 p-4 text-center">TIME</div>
            <div className="w-1/5 p-4 text-center">BPM</div>
            <div className="w-1/5 p-4 text-center">MOOD</div>
            <div className="w-1/5 p-4 text-center">PRICE</div>
          </div>

          {/* Music Row Example */}
          <Link to={""} className="flex text-gray-100 hover:bg-gray-600 transition-colors">
            <div className="w-1/5 p-4 text-center">Kendrick</div>
            <div className="w-1/5 p-4 text-center">3:30</div>
            <div className="w-1/5 p-4 text-center">120</div>
            <div className="w-1/5 p-4 text-center">Sad</div>
            <div className="w-1/5 p-4 text-center flex justify-center gap-2">
              <span className="text-sm">R0.00</span>
              <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Pass the props to Player component */}
        <Player
          artistname="Kendrick Lamar"
          title="HUMBLE"
          imagesrc="path/to/album-image.jpg"
          audiosrc="path/to/audio-file.mp3"
          time="3:30"
          
        />
      </div>
    </>
  );
};

export default Mainpage;
