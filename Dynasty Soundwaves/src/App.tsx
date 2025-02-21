import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import MainPage from './Components/Mainpage';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Cart from './Cards/Cart';
import Terms from './Components/Terms';
import Payment from './Components/Payment';
import Usereport from './Components/Usereport';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100  ">
      <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/termsandconditions" element={<Terms/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/usereport" element={<Usereport/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
