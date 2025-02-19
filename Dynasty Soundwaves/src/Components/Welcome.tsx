import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeGif from '../assets/welcome.gif';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home'); // Navigate to MainPage after 3 seconds
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <img src={welcomeGif} alt="Welcome" className="w-80 h-auto" />
    </div>
  );
};

export default Welcome;
