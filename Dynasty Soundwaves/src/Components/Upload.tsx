import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [duration, setDuration] = useState<number | null>(null);
  const [songTitle, setSongTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

    useEffect(() => {
      
  
      if (!user) {
        navigate("/");
      } 
    }, [navigate]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mp3') {
      const reader =  new FileReader();
       reader.onloadend = () => {
        // setting base64 of audio
            setAudioFile(reader.result as string); 
            const audio =  new Audio(reader.result as string);
            audio.onloadedmetadata =() => {
                  setDuration(audio.duration);
            };

       };
       reader.readAsDataURL(file); // Convert audio file to base64
    
 
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set base64 string of image
      };
      reader.readAsDataURL(file); // Convert image file to base64
    }
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newTags = value.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0);

    // Ensure the tag array doesn't exceed 8 tags
    if (newTags.length <= 8) {
      setTags(newTags);
    } else {
      setTags(newTags.slice(0, 8)); // Only keep the first 8 tags
    }
  };
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;
  
      const updatedData = {
        songTitle,
        duration,
        genre,
        bpm,
        mood,
        price,
        audioFile,
        userId: user._id, // Update to match the correct field for user identification
        tags,
        image,
      };
  
      const response = await fetch(`http://localhost:5000/api/music/upload`, {
        method: "POST", // Assuming it's a POST request for upload
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
  
      if (data?.success) {
        alert(data.message);
      } else {
        alert(data.message || "Upload failed, please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-gray-900 p-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Upload Music</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Song Title:</label>
            <input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Genre:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mood:</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">BPM:</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price in Rands:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Audio (MP3):</label>
            <input
              type="file"
              accept=".mp3"
              onChange={handleFileChange}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {audioFile && (
              <p className="text-gray-600 mt-2">Duration: {duration ? duration.toFixed(2) : 'Loading...'} seconds</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Image (PNG/JPG):</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageChange}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {image && <p className="text-gray-600 mt-2">Image selected: {image}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Tags (up to 8):</label>
            <input
              type="text"
              onChange={handleTagsChange}
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-gray-600 mt-2">Tags: {tags.join(', ')}</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-900 w-full text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
