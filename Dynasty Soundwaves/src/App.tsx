import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import MainPage from './Components/Mainpage';
import Navbar from './Components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 ">
      
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
