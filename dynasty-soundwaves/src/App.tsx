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
import Payments from './Components/Payments';
import Members from './Components/Members';
import Upload from './Components/Upload';
import MusicList from './Components/MusicList';
import UpdateTerms from './Components/UpdateTerms';
import Reports from './Components/Reports';



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
          <Route path="/payments" element={<Payments/>} />
          <Route path="/members" element={<Members/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/artistmusic" element={<MusicList/>} />
           <Route path="/termsandcondition" element={<UpdateTerms/>} />
           <Route path="/allreport" element={<Reports/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
