import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import {  useNavigate } from "react-router-dom";
import Player from "../Cards/Player";
import {STATUS_CODES} from    '../constants.ts';




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
    { id: 8, label: "R5000 - R1000000(Elite)" },
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
interface Cart {
  userID: string;
  musicIDS: string[];
}

const Mainpage = () => {
 //    filtering
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedBPM, setSelectedBPM] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
   const [musicList, setMusicList] = useState<Music[]>([]);
   const [filteredMusicList, setFilteredMusicList] = useState<Music[]>([]);
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
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  

 // Filter function
 useEffect(() => {
  let filtered = [...musicList];
 // Search filter by tags
 if (searchTerm.trim()) {
  const searchLower = searchTerm.toLowerCase();
  filtered = filtered.filter((music) =>
    music.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
    music.title.toLowerCase().includes(searchLower) || // Optional: search by title too
    music.sellerName.toLowerCase().includes(searchLower) // Optional: search by seller name
  );
}

  if (selectedMood) {
    filtered = filtered.filter((music) => music.mood === selectedMood);
  }

  if (selectedGenre) {
    filtered = filtered.filter((music) => music.genre === selectedGenre);
  }

  if (selectedBPM) {
    const [minBPM, maxBPM] = selectedBPM.split(" - ").map((val: string) => {
      if (val.includes("+")) return Infinity;
      return parseInt(val);
    });
    filtered = filtered.filter((music) => 
      music.bpm >= minBPM && (maxBPM === Infinity ? true : music.bpm <= maxBPM)
    );
  }

  if (selectedPrice) {
    if (selectedPrice === "Free") {
      filtered = filtered.filter((music) => music.price === 0);
    } else {
      const [minPrice, maxPrice] = selectedPrice.split(" - ").map((val: string) => {
        if (val.includes("+")) return Infinity;
        return parseInt(val.replace("R", ""));
      });
      filtered = filtered.filter((music) => 
        music.price >= minPrice && (maxPrice === Infinity ? true : music.price <= maxPrice)
      );
    }
  }

  setFilteredMusicList(filtered);
}, [selectedMood, selectedGenre, selectedBPM, selectedPrice, musicList,searchTerm]);


  
     // for seting the id to play audio
// 



     const playAudio = async (trackID: string, title: string, name: string, image: string, time: number) => {
      
      try {
          const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/music/get-audio/${trackID}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",  
          })
          if(res.status === STATUS_CODES.BAD_REQUEST){
            alert("Track ID is required");
          }else if (res.status === STATUS_CODES.NOT_FOUND){
            alert("Song not found");
          }else{
            const data = await res.json();
         
            if (data?.success) {
              setPlayID(trackID);
              setPlayTitle(title);
              setPlayName(name);
              setPlyImage(image);
              setPlayAudioTrack(data.data.audio);
              setPlayTime(time);
              const index = musicList.findIndex(m => m._id === trackID);
              sessionStorage.setItem('indexSong',index.toString());
          }

          
         console.log(playTime);
       } 
      } catch (error) {
            console.error("Error getting music:", error);
       alert("An error occurred. Please try again.");
      }
      

    };
  
    const [currentIndex, setCurrentIndex] = useState<number>(parseInt(sessionStorage.getItem('indexSong') || '0'));
    // play for next
    useEffect(() => {
      const playNextorPrev = (number: number) => {
        const totalSongs = JSON.parse(sessionStorage.getItem('totalSongs') ?? '[]');

        let newIndex = number;
  
        // Handle next or prev logic
        if (newIndex >= totalSongs.length) newIndex = 0;  // Loop back to first song
        if (newIndex < 0) newIndex = totalSongs.length - 1;  // Loop to last song
  
        // Update the sessionStorage and state
        sessionStorage.setItem('indexSong', newIndex.toString());
        setCurrentIndex(newIndex);

            


      };
  
      // Call playNextorPrev function if sessionStorage 'indexSong' changes
      playNextorPrev(currentIndex);
    },[currentIndex]);

  useEffect(() => {
    const getMusic = async  () => {
        console.log("why cant i get music ");
        console.log("useEffect triggered!");
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/music/get-all-music`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",  
         
        });
          if(response.status === STATUS_CODES.OK){
            const data = await response.json();
    
          
                 setMusicList(data.data)
                 sessionStorage.setItem('totalSongs', data.data.length);  
                
                 sessionStorage.setItem('music',JSON.stringify(data.data));
               
            
          } else {
            alert("Update failed, please try again.");
          }

      } catch (error) {
       console.error("Error getting music:", error);
       alert("An error occurred. Please try again.");
      }
    };
    getMusic();
    
  },[]);

  const token = sessionStorage.getItem("token");
// adding to cartdfgd
const user = JSON.parse(sessionStorage.getItem("user") || "null");
const [cart, setCart] = useState<Cart>({
  userID: user?._id || "", // Ensure it's a valid string
  musicIDS: [],
});



const handleExistingCart = async (id: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/cart/add-to-cart/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ musicID: id }),
    });
  if(res.status === STATUS_CODES.BAD_REQUEST){
    alert("already exits");
  }else {
    const data = await res.json();

    if (data?.success) {
      alert(data.message || "Music added to cart successfully.");
      navigate("/cart");
    } else {
      alert(data.message || "Failed to add to cart, please try again.");
    }
  }
    
  } catch (error) {
    console.error("Error adding to existing cart:", error);
    alert("An error occurred while updating the cart.");
  }
};


const navigate = useNavigate();
const handleCart = async (id: string) => {
  console.log(user);
  if (!user || !token) {
    alert("Login first");
    return;
  }

  const userIDDS = user._id;
  const updatedCart = cart && cart.musicIDS
    ? { ...cart, musicIDS: [...new Set([...cart.musicIDS, id])] } // Prevent duplicates
    : { userID: userIDDS, musicIDS: [id] };

  setCart(updatedCart);
  console.log(updatedCart);

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/cart/create-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(updatedCart),
    });
  if( response.status === STATUS_CODES.BAD_REQUEST){
    alert("exits");
  }else {
    const data = await response.json();

    if (data?.success) {
      alert(data.message || "Music added to cart successfully.");
      navigate("/cart");
    } else {
      alert(data.message || "Failed to add to cart, please try again.");
      if (data.message === "exits") {
        await handleExistingCart(id);
      }
    }
  }

  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("An error occurred. Please try again.");
  }
};


  return (
<>
  <div className="min-h-screen">
    <div className="text-gray-100">
      {/* Search Bar */}
      <div className="flex justify-center p-4">
        <div className="flex items-center bg-gray-900 p-2 rounded-lg w-full max-w-lg">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 outline-none bg-transparent text-gray-100 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col   lg:flex-row gap-2 justify-center px-4 md:px-10 lg:px-32 py-4">
        {[ 
          { state: selectedMood, setter: setSelectedMood, options: Mood, label: "All Moods" },
          { state: selectedGenre, setter: setSelectedGenre, options: Genre, label: "All Genres" },
          { state: selectedBPM, setter: setSelectedBPM, options: BPM, label: "All BPMs" },
          { state: selectedPrice, setter: setSelectedPrice, options: Price, label: "All Prices" },
        ].map(({ state, setter, options, label }, index) => (
          <div key={index} className="bg-gray-900 p-2 rounded-lg w-full  flex h-10">
            <select
              value={state}
              onChange={handleFilterChange(setter)}
              className="bg-gray-900 text-gray-100 w-full"
            >
              <option value="">{label}</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

{/* Music List */}
<div className="bg-gray-900 py-3 px-2 sm:px-4 md:px-6 lg:mx-20 md:rounded-lg shadow-lg overflow-x-auto">
  <div className="w-full">
    {/* Header - Hidden on mobile, flex on tablet+ */}
    <div className="hidden sm:flex bg-gray-800 text-gray-100 font-semibold">
      {["Name", "Title", "Time", "BPM", "Mood", "Price"].map((header, index) => (
        <div key={index} className="flex-1 min-w-[100px] p-3 sm:p-4 text-center">{header}</div>
      ))}
    </div>

    {filteredMusicList.length === 0 ? (
      <p className="text-center text-gray-500 text-base sm:text-lg py-4">No music matches your filters!</p>
    ) : (
      filteredMusicList.map((music) => (
        <a
          key={music._id}
          onClick={() => playAudio(music._id, music.title, music.sellerName, music.image, music.duration)}
          className="block sm:flex text-gray-100 hover:bg-gray-600 transition-colors border-b  border-gray-700 p-3"
        >
{/* Mobile layout - stacked */}
<div className="sm:hidden space-y-4 bg-gray-800 rounded-lg p-6 shadow-lg">
  <div className="flex items-center gap-4">
    <img
      src={music?.image}
      alt={music?.title}
      className="h-16 w-16 rounded-lg object-cover border-2 border-gray-700"
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg text-gray-100 truncate">{music?.title}</h3>
      <p className="text-sm text-gray-400">{music?.sellerName}</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 text-sm">
    <div className="flex flex-col">
      <span className="text-gray-400">Duration</span>
      <span className="text-gray-100">{formatDuration(music.duration)}</span>
    </div>

    <div className="flex items-center gap-2 justify-end">
      <span className="text-gray-400">Price</span>
      <span className="text-gray-100 font-medium">R{music?.price}.00</span>
      <button
        onClick={() => handleCart(music._id)}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <FaShoppingCart className="text-xl text-gray-100 hover:text-gray-300" />
      </button>
    </div>
  </div>
</div>

          {/* Tablet/Desktop layout - grid */}
          <div className="hidden sm:flex w-full flex-1">
            <div className="flex-1 min-w-[100px] p-2 text-center">{music?.sellerName}</div>
            <div className="flex-1 min-w-[100px] p-2 text-center">{music?.title}</div>
            <div className="flex-1 min-w-[100px] p-2 text-center">{formatDuration(music.duration)}</div>
            <div className="flex-1 min-w-[100px] p-2 text-center">{music?.bpm}</div>
            <div className="flex-1 min-w-[100px] p-2 text-center">{music?.mood}</div>
            <div className="flex-1 min-w-[100px] p-2 text-center flex items-center justify-center gap-2">
              <span className="text-sm">R {music?.price}.00</span>
              <FaShoppingCart 
                onClick={() => handleCart(music._id)} 
                className="text-xl cursor-pointer hover:text-gray-400" 
              />
            </div>
          </div>
        </a>
      ))
    )}
  </div>
</div>

      {/* Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player
          songID={playID}
          title={playTitle}
          artistName={playName}
          image={playImage}
          audioTrack={playAudioTrack}
          playing={true}
        />
      </div>
    </div>
  </div>
</>

  );
};

export default Mainpage;
