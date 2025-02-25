import React, { useState, ChangeEvent } from 'react';

const Upload = () => {
  const [duration, setDuration] = useState<number | null>(null);
  const [songTitle, setSongTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mp3') {
      setAudioFile(file);
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        setDuration(audio.duration); // duration in seconds
      };
    }
    
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 8) {
      setTags(value.split(',').map(tag => tag.trim()));
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
            {image && <p className="text-gray-600 mt-2">Image selected: {image.name}</p>}
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
