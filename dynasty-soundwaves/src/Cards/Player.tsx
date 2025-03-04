import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaStepForward, FaStepBackward } from 'react-icons/fa';
import artwork from '../assets/qqq.jpg';

type PlayerProps = {
  songID: string;
  title: string;
  artistName: string;
  image?: string;
  audioTrack?: string;
  playing?: boolean; // Optional initial state
};

const Player: React.FC<PlayerProps> = ({ songID, title, artistName, image, audioTrack, playing = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(playing); // Internal state, initialized with prop
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Sync audio state with isPlaying and handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Initial sync
    if (playing !== isPlaying) {
      setIsPlaying(playing);
      if (playing) {
        audio.play().catch(error => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playing]);

  // Load new audio track when audioTrack changes
  useEffect(() => {
    if (audioRef.current && audioTrack) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      }
    }
  }, [audioTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      }
      setIsPlaying(prev => !prev);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); // Skip back 10 seconds
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10); // Skip forward 10 seconds
      setCurrentTime(audioRef.current.currentTime);
    }
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
      setCurrentTime(newTime);
    }
  };
   
// Playing next
const handleNext = (index: number, playNumber: number, totalNumber: number) => {
  let n = playNumber + 1;  // Increment playNumber to move to the next item
  if (n >= totalNumber) n = 0;  
  sessionStorage.setItem('indexSong', n.toString());  
}

// Playing previous
const handlePrev = (index: number, playNumber: number, totalNumber: number) => {
  let n = playNumber - 1;  
  if (n < 0) n = totalNumber - 1; 
  sessionStorage.setItem('indexSong', n.toString()); 
}



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
          <p className="text-gray-100 text-base md:text-lg font-medium">{title}</p>
          <p className="text-gray-400 text-sm">{artistName}</p>
        </div>

        <div className="flex  md:flex-row items-center gap-10">
          <button
            onClick={skipBackward}
            className="text-gray-100 hover:text-gray-300 transition-colors"
            aria-label="Skip backward"
          >
            <FaStepBackward className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="text-gray-100 hover:text-gray-300 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause className="h-8 w-8" /> : <FaPlay className="h-8 w-8" />}
          </button>
          
          <button
            onClick={skipForward}
            className="text-gray-100 hover:text-gray-300 transition-colors"
            aria-label="Skip forward"
          >
            <FaStepForward className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <img src={image || artwork} alt="Album cover" className="h-12 w-12 object-cover rounded-md" />
      </div>

      <div className="flex items-center  gap-10 md:gap-4">
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
          <div className="text-gray-100">
            {volume > 0 ? <FaVolumeUp className="h-3 w-3 md:h-5 md:w-5" /> : <FaVolumeDown className="h-5 w-5" />}
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