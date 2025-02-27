import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaStepForward, FaStepBackward } from 'react-icons/fa';
import artwork from '../assets/qqq.jpg';

type PlayerProps = {
  songID: string;
  title: string;
  artistName: string;
  image?: string; 
  audioTrack?: string; 
  time?: number;
};

const Player: React.FC<PlayerProps> = ({ songID, title, artistName, image, audioTrack }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
      setDuration(audioRef.current.duration || 0);
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
    if (isNaN(time) || time <= 0) return "0:00";
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
    <div className="bg-gray-900 p-2 shadow-lg w-full">
      <audio
        ref={audioRef}
        src={audioTrack || `https://your-audio-source.com/${songID}.mp3`} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <div className="flex items-center mb-4 justify-between">
        <div className="ml-4">
          <p className="text-white text-lg font-medium">{title}</p>
          <p className="text-gray-400 text-sm">{artistName}</p>
        </div>

        <div className="flex items-center gap-10">
          <button className="text-white hover:text-gray-300 transition-colors">
            <FaStepBackward className="h-5 w-5" />
          </button>
          
          <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
            {isPlaying ? <FaPause className="h-8 w-8" /> : <FaPlay className="h-8 w-8" />}
          </button>
          
          <button className="text-white hover:text-gray-300 transition-colors">
            <FaStepForward className="h-5 w-5" />
          </button>
        </div>

        <img src={image  ||  artwork} alt="Album cover" className="h-12 w-12 object-cover rounded-md" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-400 text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-white">
            {volume > 0 ? <FaVolumeUp className="h-5 w-5" /> : <FaVolumeDown className="h-5 w-5" />}
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
