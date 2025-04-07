import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

// Lazy load all components
const Welcome = React.lazy(() => import('./Components/Welcome'));
const MainPage = React.lazy(() => import('./Components/Mainpage'));
const Navbar = React.lazy(() => import('./Components/Navbar'));
const Profile = React.lazy(() => import('./Components/Profile'));
const Cart = React.lazy(() => import('./Cards/Cart'));
const Terms = React.lazy(() => import('./Components/Terms'));
const Payment = React.lazy(() => import('./Components/Payment'));
const Usereport = React.lazy(() => import('./Components/Usereport'));
const Payments = React.lazy(() => import('./Components/Payments'));
const Members = React.lazy(() => import('./Components/Members'));
const Upload = React.lazy(() => import('./Components/Upload'));
const MusicList = React.lazy(() => import('./Components/MusicList'));
const UpdateTerms = React.lazy(() => import('./Components/UpdateTerms'));
const Reports = React.lazy(() => import('./Components/Reports'));

// Define styles with blue and black theme
const styles = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Black background
  },
  appContainer: {
    backgroundColor: '#000000', // Changed from gray-100 to black
    minHeight: '100vh',
    color: '#1E90FF', // Blue text
  }
};

// Loading component with ClipLoader
const LoadingFallback = () => (
  <div style={styles.loadingContainer}>
    <ClipLoader
      color="#1E90FF" // Blue color
      size={50}
      speedMultiplier={0.8}
    />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <div style={styles.appContainer} className="bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/termsandconditions" element={<Terms />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/usereport" element={<Usereport />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/members" element={<Members />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/artistmusic" element={<MusicList />} />
            <Route path="/termsandcondition" element={<UpdateTerms />} />
            <Route path="/allreport" element={<Reports />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;