import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Music {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  duration: string;
  image: string;
  bought: boolean;
}

const dummyMusic: Music[] = [
  {
    id: 1,
    title: "Amapiano Vibes",
    genre: "Amapiano",
    bpm: 120,
    duration: "3:45",
    image: "https://via.placeholder.com/150",
    bought: false,
  },
  {
    id: 2,
    title: "Chill House",
    genre: "Deep House",
    bpm: 110,
    duration: "4:20",
    image: "https://via.placeholder.com/150",
    bought: true,
  },
];

const MusicList: React.FC = () => {
  const [musicList, setMusicList] = useState<Music[]>(dummyMusic);

  const handleDelete = (id: number) => {
    setMusicList(musicList.filter((music) => music.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
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
                key={music.id}
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
                    <span className="font-medium">Duration:</span> {music.duration}
                  </p>

                  {/* Status (Bought or Not Bought) */}
                  <p
                    className={`text-sm font-medium mt-4 ${
                      music.bought ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {music.bought ? "Bought " : "Not Bought "}
                  </p>

                  {/* Delete Button */}
                  <div className="mt-4 flex justify-between">
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Genre:</span> {music.genre}
                  </p>
                    <button
                      onClick={() => handleDelete(music.id)}
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
