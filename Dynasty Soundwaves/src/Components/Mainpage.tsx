import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import Navbar from "./Navbar";

const Mood = [
  { id: 1, label: "Happy (Always)" },
  { id: 2, label: "Sad " },
  { id: 3, label: "Energetic" },
  { id: 4, label: "Calm" },
  { id: 5, label: "Romantic" },
  { id: 6, label: "Dark" },
  { id: 7, label: "Chill" },
  { id: 8, label: "Epic" },
];

const Genre = [
  { id: 1, label: "Hip-Hop" },
  { id: 2, label: "R&B" },
  { id: 3, label: "Pop" },
  { id: 4, label: "Afrobeat" },
  { id: 5, label: "Amapiano" },
  { id: 6, label: "Trap" },
  { id: 7, label: "Lo-Fi" },
  { id: 8, label: "Electronic" },
];

const BPM = [
    { id: 1, label: "60 - 80 (Slow)" },
    { id: 2, label: "80 - 100 (Chill)" },
    { id: 3, label: "100 - 120 (Groovy)" },
    { id: 4, label: "120 - 140 (Upbeat)" },
    { id: 5, label: "140 - 160 (Energetic)" },
    { id: 6, label: "160 - 180 (Fast)" },
    { id: 7, label: "180 - 200 (Hype)" },
    { id: 8, label: "200+ (Extreme)" },
  ];

const Price = [
  { id: 1, label: "Free" },
  { id: 2, label: "R50 - R100 (Budget)" },
  { id: 3, label: "R100 - R250 (Affordable)" },
  { id: 4, label: "R250 - R500 (Standard)" },
  { id: 5, label: "R500 - R1000 (Premium)" },
  { id: 6, label: "R1000 - R2500 (Exclusive)" },
  { id: 7, label: "R2500 - R5000 (Industry Level)" },
  { id: 8, label: "R5000+ (Elite)" },
];

const Mainpage = () => {
  // State for selected filters
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBPM, setSelectedBPM] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleFilterChange = (setter:any) => (event:any) => {
    setter(event.target.value);
  };

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

        {/* Filter Section */}
        <div className="flex py-14 px-52 justify-center gap-20">
          {/* Mood Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-full flex h-10 justify-between">
          <select
    aria-label="Select Mood"
    value={selectedMood}
    onChange={handleFilterChange(setSelectedMood)}
    className="bg-gray-900 text-gray-100 w-full" // Added w-full for consistent width
  >
    <option value="" disabled>Mood</option>
    {Mood.map((mood) => (
      <option key={mood.id} value={mood.label}>
        {mood.label}
      </option>
    ))}
  </select>
           
          </div>

          {/* Genre Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-full max-w-xs flex h-10 justify-between">
            <select
              value={selectedGenre}
              onChange={handleFilterChange(setSelectedGenre)}
              className="bg-gray-900 text-gray-100  w-full"
            >
              <option value="">Genre</option>
              {Genre.map((genre) => (
                <option key={genre.id} value={genre.label}>
                  {genre.label}
                </option>
              ))}
            </select>
       
          </div>

          {/* BPM Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-full max-w-xs flex h-10 ">
            <select
              value={selectedBPM}
              onChange={handleFilterChange(setSelectedBPM)}
              className="bg-gray-900 text-gray-100  w-full"
            >
              <option value="">BPM</option>
              {BPM.map((bpm) => (
                <option key={bpm.id} value={bpm.label}>
                  {bpm.label}
                </option>
              ))}
            </select>
         
          </div>

          {/* Price Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-full max-w-xs flex h-10 ">
            <select
              value={selectedPrice}
              onChange={handleFilterChange(setSelectedPrice)}
              className="bg-gray-900 text-gray-100  w-full"
            >
              <option value="">Price</option>
              {Price.map((price) => (
                <option key={price.id} value={price.label}>
                  {price.label}
                </option>
              ))}
            </select>
          
          </div>
        </div>

        {/*Just for pain */}
        <div className="text-gray-100">
          <p>Selected Filters:</p>
          <ul>
            {selectedMood && <li>Mood: {selectedMood}</li>}
            {selectedGenre && <li>Genre: {selectedGenre}</li>}
            {selectedBPM && <li>BPM: {selectedBPM}</li>}
            {selectedPrice && <li>Price: {selectedPrice}</li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
