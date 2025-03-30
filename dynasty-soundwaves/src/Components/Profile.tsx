import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {STATUS_CODES} from    '../constants.ts';
const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Read-only
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [password, setPassword] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  useEffect(() => {
    

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio || "");
      setFacebook(user.social?.facebook || "");
      setInstagram(user.social?.instagram || "");
      setX(user.social?.x || "");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log(token);
      if (!token) return;

      const updatedData: any = { name, email, bio, social: { facebook, instagram, x },token };
      if (password.trim() !== "") updatedData.password = password;

      const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/auth/update-profile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      if(response.status === STATUS_CODES.NOT_FOUND){
        alert('User not found');

      }else{
        const data = await response.json();

        if (data?.success) {
          alert(data.message);
        } else {
          alert(data.message || "Update failed, please try again.");
        }
      }
    
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:p-6 bg-gray-50 shadow-lg rounded-lg">
    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
      Edit Profile
    </h2>
  
    <div className="space-y-4 sm:space-y-5">
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Email
        </label>
        <input
          type="email"
          value={email}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm sm:text-base cursor-not-allowed"
          readOnly
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Password
        </label>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base h-24 resize-y focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Facebook
        </label>
        <input
          type="text"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          Instagram
        </label>
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <div>
        <label className="block font-medium text-gray-800 text-sm sm:text-base">
          X (Twitter)
        </label>
        <input
          type="text"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
  
      <button
        onClick={handleUpdate}
        className="w-full bg-gray-800 text-white py-2 sm:py-3 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base font-medium"
      >
        Update Profile
      </button>
    </div>
  </div>
  );
};

export default Profile;
