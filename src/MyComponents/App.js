import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavBar from "./MyComponents/NavBar";
import Header from "./MyComponents/Header";
import Feature from "./MyComponents/Feature";
import Footer from "./MyComponents/Footer";
import About from "./MyComponents/About";
import Login from "./MyComponents/Login";
import Support from "./MyComponents/Support";
import SignUp from "./MyComponents/SignUp";
import UserLayout from "./MyComponents/UserLayout"; // Import UserLayout
import AdminLayout from "./MyComponents/AdminLayout";
import DiningLayout from "./MyComponents/DiningLayout"; // Import DiningLayout

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  const location = useLocation();

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
  };

  const openSignUpModal = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  const isAdminHome = location.pathname.startsWith("/admin");
  const isDiningManagerHome = location.pathname.startsWith("/dining");

  return (
    <div className="App">
      {/* Home Page */}
      {location.pathname === "/" && (
        <>
          <NavBar />
          <Header openLoginModal={openLoginModal} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <About />
                  <Feature />
                  <Support />
                  <Footer />
                </>
              }
            />
          </Routes>
        </>
      )}

      {/* Dashboard, Admin and Dining Manager Routes */}
      {location.pathname !== "/" && (
        <>
          {isAdminHome ? (
            <AdminLayout /> // Admin Layout will handle its own routes
          ) : isDiningManagerHome ? (
            <DiningLayout /> // Dining Manager Layout will handle its own routes
          ) : (
            <UserLayout /> // All user routes are now handled in UserLayout
          )}
        </>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="login-modal">
          <div className="modal-content">
            <Login
              closeLoginModal={closeModals}
              openSignUpModal={openSignUpModal}
              isLoginOpen={isLoginOpen}
              isSignUpOpen={isSignUpOpen}
            />
            <button className="lclose-btn" onClick={closeModals}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>
      )}

      {/* Sign-Up Modal */}
      {isSignUpOpen && (
        <div className="sign-up-modal">
          <div className="modal-content">
            <SignUp closeSignUpModal={closeModals} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
