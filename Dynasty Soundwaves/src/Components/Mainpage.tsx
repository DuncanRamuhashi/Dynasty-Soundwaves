import React, { useEffect, useState } from "react";
import { FaArrowDown, FaShoppingCart } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Player from "../Cards/Player";
const Mood = [
    { id: 1, label: "Happy" },
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
  interface Music {
    _id: string;
    title: string;
    duration: number;
    genre: string;
    bpm: number;
    mood: string;
    price: number;
    audio: string;
    downloadable: boolean;
    sellerID: string;
    tags: string[];
    image: string;
    sellerName: string;
}


const Mainpage = () => {
 
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBPM, setSelectedBPM] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
   const [musicList, setMusicList] = useState<Music[]>([]);
  const handleFilterChange = (setter: any) => (event: any) => {
    setter(event.target.value);
  };
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };


  const [playID, setPlayID] = useState("");
  const [playTitle, setPlayTitle] = useState("");
  const [playName, setPlayName] = useState("");
  const [playImage, setPlyImage] = useState("");
  const [playAudioTrack, setPlayAudioTrack] = useState("");
  const [playTime, setPlayTime] = useState(Number);
     // for seting the id to play audio




     const playAudio = async (trackID: string, title: string, name: string, image: string, audio: string, time: number) => {
      
      try {
          const res = await fetch(`http://localhost:5000/api/music/get-audio/${trackID}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",  
          })
          const data = await res.json();
         
          if (data?.success) {
            setPlayID(trackID);
            setPlayTitle(title);
            setPlayName(name);
            setPlyImage(image);
            setPlayAudioTrack(data.data.audio);
            setPlayTime(time);
         
       } else {
         alert(data.message || "Update failed, please try again.");
       }
      } catch (error) {
            console.error("Error getting music:", error);
       alert("An error occurred. Please try again.");
      }
      

    };
    
  useEffect(() => {
    const getMusic = async  () => {
      try {
        const response = await fetch(`http://localhost:5000/api/music/get-all-music`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",  
         
        });
  
        const data = await response.json();
    
        if (data?.success) {
             setMusicList(data.data)
          
        } else {
          alert(data.message || "Update failed, please try again.");
        }
      } catch (error) {
       console.error("Error getting music:", error);
       alert("An error occurred. Please try again.");
      }
    };
    getMusic();
    
  },[]);
  console.log(musicList);
  return (
    <>
     
      <div className="text-gray-100   ">
            {/* Search Bar */}
            <div className="flex justify-center ">
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
        <div className="flex py-6 px-52 justify-center gap-2">
          {/* Mood Filter */}
          <div className=" bg-gray-900 p-2 rounded-lg w-96 flex h-10 justify-between">
          <select
    aria-label="Select Mood"
    value={selectedMood}
    onChange={handleFilterChange(setSelectedMood)}
    className="bg-gray-900 text-gray-100 w-full"
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
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-96 max-w-xs flex h-10 justify-between">
            <select
              value={selectedGenre}
              onChange={handleFilterChange(setSelectedGenre)}
              className="bg-gray-900 text-gray-100  w-full"
            >
              <option value="" disabled>Genre</option>
              {Genre.map((genre) => (
                <option key={genre.id} value={genre.label}>
                  {genre.label}
                </option>
              ))}
            </select>
       
          </div>

          {/* BPM Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-96 max-w-xs flex h-10 ">
            <select
              value={selectedBPM}
              onChange={handleFilterChange(setSelectedBPM)}
              className="bg-gray-900 text-gray-100  w-full "
            >
              <option value="" disabled>BPM</option>
              {BPM.map((bpm) => (
                <option key={bpm.id} value={bpm.label} className="">
                  {bpm.label}
                </option>
              ))}
            </select>
         
          </div>

          {/* Price Filter */}
          <div className="text-gray-100 bg-gray-900 p-2 rounded-lg w-96 max-w-xs flex h-10 ">
            <select
              value={selectedPrice}
              onChange={handleFilterChange(setSelectedPrice)}
              className="bg-gray-900 text-gray-100  w-full"
            >
              <option value="" disabled>Price</option>
              {Price.map((price) => (
                <option key={price.id} value={price.label}>
                  {price.label}
                </option>
              ))}
            </select>
          
          </div>
        </div>

        {/* Music Table */}
        <div className="flex flex-col bg-gray-900 py-3 px-3 mx-52 rounded-lg shadow-lg">
          <div className="flex bg-gray-800 text-gray-100 font-semibold">
          <div className="w-1/5 p-4 text-center">Name</div>
            <div className="w-1/5 p-4 text-center">TITLE</div>
            <div className="w-1/5 p-4 text-center">TIME</div>
            <div className="w-1/5 p-4 text-center">BPM</div>
            <div className="w-1/5 p-4 text-center">MOOD</div>
            <div className="w-1/5 p-4 text-center">PRICE</div>
          </div>
          {musicList.length === 0 ? (
  <p className="text-center text-gray-500 text-lg">
    No music in your collection yet!
  </p>
) : (
  musicList.map((music) => (
    <a onClick={() =>playAudio(music._id,music.title,music.sellerName,music.image,music.audio,music.duration)} key={music._id} className="flex text-gray-100 hover:bg-gray-600 transition-colors">
       <div className="w-1/5 p-4 text-center">{music?.sellerName}</div>
      <div className="w-1/5 p-4 text-center">{music?.title}</div>
      <div className="w-1/5 p-4 text-center">{formatDuration((music.duration))} min</div>
      <div className="w-1/5 p-4 text-center">{music?.bpm}</div>
      <div className="w-1/5 p-4 text-center">{music?.mood}</div>
      <div className="w-1/5 p-4 text-center flex justify-center gap-2">
        <span className="text-sm">R{music?.price}.00</span>
        <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-400" />
      </div>
    </a>
  ))
)}



        </div>

       
        <div className="flex fixed bottom-0 left-0 right-0 z-50 "> 
        <Player
          songID={playID}
          title= {playTitle}
          artistName= {playName}
          image= {playImage}
          audioTrack= {playAudioTrack}
           time = {playTime}
        />
        </div>
      </div>
    </>
  );
};

export default Mainpage;
