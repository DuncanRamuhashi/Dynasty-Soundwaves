import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa'; // Import icons

type PlayerProps = {
  artistname: string;
  title: string;
  imagesrc: string;
  audiosrc: string;
  time: string;
};

const Player: React.FC<PlayerProps> = ({ artistname, title, imagesrc, audiosrc, time }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 1 (100%)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  return (
    <div className=" bg-gray-900 p-4  shadow-lg w-full ">
      <audio
        ref={audioRef}
        src={audiosrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <div className="flex items-center mb-4">
        <img src={imagesrc} alt="Album cover" className="h-20 w-20 object-cover rounded-md" />
        <div className="ml-4">
          <p className="text-white text-lg">{artistname}</p>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-gray-400 text-sm">{time}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button onClick={togglePlay} className="text-white hover:text-gray-300 mr-3 focus:outline-none">
          {isPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6" />}
        </button>

        <div className="flex-grow">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full appearance-none bg-gray-600 rounded-md h-1 cursor-pointer"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="ml-4 flex items-center">
          {volume > 0 ? <FaVolumeUp className="h-6 w-6 text-white hover:text-gray-300 mr-2 cursor-pointer" /> : <FaVolumeDown className="h-6 w-6 text-white hover:text-gray-300 mr-2 cursor-pointer" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 appearance-none bg-gray-600 rounded-md h-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
