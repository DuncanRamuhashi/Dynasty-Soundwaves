import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface MusicUploadData {
  title: string;
  duration: number | null;
  genre: string;
  bpm:  number | null;
  mood: string;
  price: number | null;
  audio: string | null;
  sellerID: string;
  tags: string[];
  image: string | null;
  token: string;
  role: string;
}
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
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const Upload = () => {
  const [duration, setDuration] = useState<number | null>(null);
  const [songTitle, setSongTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [bpm, setBpm] = useState<number|null>(null);
  const [price, setPrice] = useState<number | null>( null);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateInputs = () => {
    if (!songTitle.trim()) return "Song title is required";
    if (!audioFile) return "Audio file is required";
    if (price && isNaN(Number(price))) return "Price must be a number";
    if (bpm && isNaN(Number(bpm))) return "BPM must be a number";
    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("Audio file must be less than 10MB");
      return;
    }

    if (file.type === 'audio/mpeg') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const audioResult = reader.result as string;
        setAudioFile(audioResult);
        
        const audio = new Audio(audioResult);
        audio.onloadedmetadata = () => {
          setDuration(audio.duration);
        };
        audio.onerror = () => {
          setError('Error loading audio file');
          setAudioFile(null);
          setDuration(null);
        };
      };
      reader.onerror = () => {
        setError('Error reading audio file');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid MP3 file');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("Image file must be less than 10MB");
      return;
    }

    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.onerror = () => {
        setError('Error reading image file');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid PNG or JPG file');
    }
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTags = e.target.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .slice(0, 8);
    setTags(newTags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError('Authentication required');
        navigate('/');
        return;
      }

      const updatedData: MusicUploadData = {
        title: songTitle,
        duration,
        genre,
        bpm,
        mood,
        price,
        audio: audioFile,
        sellerID: user._id,
        tags,
        image,
        token,
        role: user.role,
      };

      const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/music/upload-music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data?.success) {
        alert(data.message);
        // Reset form
        setSongTitle('');
        setGenre('');
        setMood('');
        setBpm(null);
        setPrice(null);
        setTags([]);
        setImage(null);
        setAudioFile(null);
        setDuration(null);
      } else {
        setError(data.message || "Upload failed, please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-gray-900 p-10">
      <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Upload Music</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Song Title:</label>
            <input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              required
            />
          </div>

          <div>
  <label className="block text-gray-700 font-medium">Genre:</label>
  <select
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    disabled={isLoading}
    className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
  >
    <option value="">Select Genre</option>
    {Genre.map((g) => (
      <option key={g.id} value={g.label}>
        {g.label}
      </option>
    ))}
  </select>
</div>
<div>
  <label className="block text-gray-700 font-medium">Mood:</label>
  <select
    value={mood}
    onChange={(e) => setMood(e.target.value)}
    disabled={isLoading}
    className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
  >
    <option value="">Select Mood</option>
    {Mood.map((m) => (
      <option key={m.id} value={m.label}>
        {m.label}
      </option>
    ))}
  </select>
</div>
          <div>
            <label className="block text-gray-700 font-medium">BPM:</label>
            <input
              type="number"
              value={bpm ?? ''}
              onChange={(e) => setBpm(Number(e.target.value))}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price in Rands:</label>
            <input
              type="number"
              value={price ?? '' }
              onChange={(e) => setPrice(Number(e.target.value))}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Audio (MP3):</label>
            <input
              type="file"
              accept=".mp3"
              onChange={handleFileChange}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              required
            />
            {audioFile && (
              <p className="text-gray-600 mt-2">
                Duration: {duration ? `${duration.toFixed(2)} seconds` : 'Loading...'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Image (PNG/JPG):</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageChange}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            />
            {image && <p className="text-gray-600 mt-2">Image selected</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Tags (up to 8)  Separate tags using a ","(Comma) :</label>
            <input
              type="text"
              
              onChange={handleTagsChange}
              disabled={isLoading}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
              placeholder="Enter tags separated by commas"
            />
            {tags.length > 0 && (
              <p className="text-gray-600 mt-2">Tags: {tags.join(', ')}</p>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gray-900 w-full text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Uploading...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSongTitle('');
                setGenre('');
                setMood('');
                setBpm(null);
                setPrice(null);
                setTags([]);
                setImage(null);
                setAudioFile(null);
                setDuration(null);
                setError(null);
              }}
              disabled={isLoading}
              className="bg-gray-500 w-full text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;