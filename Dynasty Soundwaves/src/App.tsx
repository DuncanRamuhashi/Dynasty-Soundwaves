import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import MainPage from './Components/Mainpage';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100  ">
      <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
