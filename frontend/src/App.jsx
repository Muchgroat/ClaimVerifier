"use client"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import HomePage from "./components/HomePage"
import VerifyPage from "./components/VerifyPage"
import LogsPage from "./components/LogsPage"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import PageTransition from "./components/PageTransition"
import LoadingTransition from "./components/LoadingTransition"
import ParticleBackground from "./components/ui/ParticleBackground"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Logo from "./assets/logo.png"

const AppContent = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Handle loading state for navigation
  useEffect(() => {
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-x-hidden font-turret-road" style={{ background: "#070e16" }}>
      {/* Loading Transition */}
      <LoadingTransition isLoading={isLoading} />

        {/* Navigation Bar */}
      <nav className="fixed items-center top-0 left-0 right-0 z-50 bg-[#070e16]/80 backdrop-blur-md" style={{
        borderBottom: '1px solid',
        borderImage: 'linear-gradient(90deg, #e0e9f6 0%, #8db5de 25%, #35257d 75%, #7f54cd 100%) 1',
      }}>
        <div className=" mx-10 px-2 py-3">
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-4">
              {/* Shield icon and title */}
              <div className="flex items-center justify-center space-x-4">
                <img src={Logo} alt="Logo" className="w-16 h-16" />
                <span
                  className="text-2xl font-bold text-white font-inter"
                  style={{ marginLeft: '0.2cm' }}
                >
                  CLAIM VERIFIER
                </span>
              </div>

              {isAuthenticated && <span className="absolute top-5 right-1/2 text-[#8db5de] text-lg">
                Welcome, {user?.name}
              </span>}
            </div>
            <div className="flex items-center float-right space-x-12 md:flex">
              <Link to="/" className="text-lg font-bold text-white bg-clip-text">
                Home
              </Link>
              <Link to="/verify" className="text-lg font-bold text-white bg-clip-text">
                Verify
              </Link>
              <Link to="/logs" className="text-lg font-bold text-white bg-clip-text">
                Logs
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">

                  <button
                    onClick={handleLogout}
                    className="text-lg font-bold text-[#8db5de] bg-clip-text hover:text-[#7f54cd] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-8 border-2 border-[#8db5de] rounded-full px-4 py-2">
                  <Link to="/login" className="text-lg font-bold text-white bg-clip-text hover:text-[#7f54cd] transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-lg font-bold text-white bg-clip-text hover:text-[#7f54cd] transition-colors">
                    Signup
                  </Link>
            </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed h-screen w-screen z-0" >
        <ParticleBackground />
                </div>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/verify" element={
            <PageTransition>
              <VerifyPage />
            </PageTransition>
          } />
          <Route path="/logs" element={
            <PageTransition>
              <LogsPage />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          } />
          <Route path="/signup" element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}
