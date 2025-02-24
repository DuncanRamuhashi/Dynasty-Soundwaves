import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email,setEmail] = useState(""); // Read-only
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [password, setPassword] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const [message, setMessage] = useState("");
  const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null');
  const navigate = useNavigate();
      // Check if user is logged and  in on component 
      
      useEffect(() => {
         
          if (storedUser) {
                setName(storedUser.name);
                setEmail(storedUser.email);
                setBio(storedUser.bio);
                setFacebook(storedUser.social.facebook);
                setInstagram(storedUser.social.instagram);
                setX(storedUser.x);
          }else{
           navigate('/')
          }
      }, []);
  
  const handleUpdate =  async() =>{
  console.log(sessionStorage.getItem('token'));
    try {

      const response = await fetch(`http://localhost:5000/api/auth/update-profile/:${storedUser._id}`, {
            method: "PUT",
            headers:{
              "Content-Type": "application/json",// Use cookie for authorization
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({name,email,password,bio,social:{facebook,instagram,x}})
           
      }
      );
      const data = await response.json();
   if(data.success){
    alert(data.message);
    
   }else{
    alert(data.message);
   }
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed, please try again");
    }

    

    
  };
      
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Profile</h2>

    

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
              {/* Social Media Links */}
              <div>
          <label className="block font-medium text-gray-800">Password</label>
          <input
             type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
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
