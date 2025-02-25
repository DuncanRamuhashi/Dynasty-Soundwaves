import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const response = await fetch(`http://localhost:5000/api/auth/update-profile/${user._id}`, {
        method: "PUT",
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
      } else {
        alert(data.message || "Update failed, please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-800">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Password</label>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-800">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
        </div>

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
