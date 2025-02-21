import React, { useState } from "react";

const Profile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email] = useState("johndoe@example.com"); // Read-only
  const [bio, setBio] = useState("I love coding and building cool projects.");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = () => {
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Profile</h2>

      {message && <p className="text-center text-sm text-green-600">{message}</p>}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-800">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block font-medium text-gray-800">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            readOnly
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium text-gray-800">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        {/* Social Media Links */}
        <div>
          <label className="block font-medium text-gray-800">Facebook</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Instagram</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">X (Twitter)</label>
          <input
            type="text"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

       
        <button
          onClick={handleUpdate}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
