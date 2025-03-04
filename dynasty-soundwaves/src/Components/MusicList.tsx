import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Music {
  _id: number;
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  image: string;
  downloadable: boolean;
}
interface Cart {
  userID: string;
  musicIDS: string[];
}

const MusicList: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const [musicList, setMusicList] = useState<Music[]>([]);
  
  const navigate = useNavigate();
  
     useEffect(() => {
            
       if (!user) {
        navigate("/");
       } 
     }, [navigate]);
// for fetcg
const token = sessionStorage.getItem("token");
useEffect(() => {
 

  const getMusic = async () => {
    try {
      const response = await fetch(`${import.meta.env.BACKENDURL}/music/get-music/${user._id}/${token}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  
       
      });

      const data = await response.json();
      console.log(data);
      if (data?.success) {
           setMusicList(data.data)
           sessionStorage.setItem("music", JSON.stringify(musicList));
      } else {
        alert(data.message || "Update failed, please try again.");
      }
    } catch (error) {
      console.error("Error getting music:", error);
      alert("An error occurred. Please try again.");
    }
  };

  getMusic();
}, []);

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// doita machelo 
  const handleDelete = async (id :string) => {
    try {
      const response = await fetch(`${import.meta.env.BACKENDURL}/music/delete-music/${id}/${token}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        credentials: "include",  
       
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (data?.success) {
        alert(data.message || "Music deleted successfully.");
        window.location.reload(); // Refresh the page   eish
           
      } else {
        alert(data.message || "Delete failed, please try again.");
      }
    } catch (error) {
      console.error("Error deleting music:", error);
      alert("An error occurred. Please try again.");
    }
  };


 
  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Your Music Collection
        </h1>

        {musicList.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No music in your collection yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicList.map((music) => (
              <div
                key={music._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
              >
                <img
                  src={music.image}
                  alt={`${music.title} Cover`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {music.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium">BPM:</span> {music.bpm}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Duration:</span> {formatDuration(parseInt(music.duration)) }
                  </p>

                  {/* Status (Bought or Not Bought) */}
                  <p
                    className={`text-sm font-medium mt-4 ${
                      music.downloadable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {music.downloadable ? "Bought " : "Not Bought "}
                  </p>
                  {/* Delete Button */}
                  <div className="mt-4 flex justify-between">
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Genre:</span> {music.genre}
                  </p>
                    <button
                      onClick={() => handleDelete(String(music._id))}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                      aria-label="Delete music"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicList;
