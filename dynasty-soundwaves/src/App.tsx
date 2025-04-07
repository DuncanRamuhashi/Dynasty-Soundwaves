import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { ClipLoader } from 'react-spinners';

// Lazy load components
const Welcome = lazy(() => import('./Components/Welcome'));
const MainPage = lazy(() => import('./Components/Mainpage'));
const Profile = lazy(() => import('./Components/Profile'));
const Cart = lazy(() => import('./Cards/Cart'));
const Terms = lazy(() => import('./Components/Terms'));
const Payment = lazy(() => import('./Components/Payment'));
const Usereport = lazy(() => import('./Components/Usereport'));
const Payments = lazy(() => import('./Components/Payments'));
const Members = lazy(() => import('./Components/Members'));
const Upload = lazy(() => import('./Components/Upload'));
const MusicList = lazy(() => import('./Components/MusicList'));
const UpdateTerms = lazy(() => import('./Components/UpdateTerms'));
const Reports = lazy(() => import('./Components/Reports'));

// Fallback loading spinner component
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen bg-white">
    <ClipLoader size={45} color="#4F46E5" />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="px-4 py-6">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            
              <Route path="/termsandcondition" element={<Terms />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/usereport" element={<Usereport />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/members" element={<Members />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/artistmusic" element={<MusicList />} />
              <Route path="/updateterms" element={<UpdateTerms />} />
              <Route path="/allreport" element={<Reports />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
