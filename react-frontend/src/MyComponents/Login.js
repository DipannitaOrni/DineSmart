import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import SignUp from './SignUp'; // Ensure SignUp is imported correctly
import axios from 'axios'; // Import Axios for API calls

function Login({ closeLoginModal, openSignUpModal, isLoginOpen, isSignUpOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage form submission state
  const navigate = useNavigate();

  const fetchAdminHallName = async (email) => {
    try {
      const response = await axios.get("http://localhost:8080/api/admins/getHallName", {
        params: { email },
      });
      const hallName = response.data.hallName;
      localStorage.setItem("hallName", hallName); // Store hallName in localStorage
      console.log("Hall Name stored in localStorage:", hallName);
    } catch (error) {
      console.error("Error fetching hall name:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable submit while loading
  
    console.log("Email:", email);
    console.log("Password:", password); // Check the values before sending the request
  
    try {
      const response = await axios.post("http://localhost:8080/api/students/login", {
        email: email,
        password: password,
      });
  
      // Handle the response from the backend
      if (response.data === "Admin Dashboard") {
        localStorage.setItem('email', email); // Store email in localStorage
        await fetchAdminHallName(email); // Fetch and store hall name for admin
        navigate("/admin"); // Navigate to Admin Dashboard
      } else if (response.data === "Student Dashboard") {
        localStorage.setItem('email', email); // Store email in localStorage
        navigate("/dashboard"); // Navigate to Student Dashboard
      } else {
        alert("Invalid email or password"); // Show an alert if credentials are incorrect
      }
    } catch (error) {
      alert("Error during login. Please try again."); // Handle any errors
    } finally {
      setIsSubmitting(false); // Re-enable submit button after request is finished
      closeLoginModal(); // Close the login modal after submission
    }
  };
  

  return (
    <div className="login-card">
      {/* Login Form */}
      {isLoginOpen && (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsTypingPassword(e.target.value.length > 0);
                }}
                required
              />
              {!isTypingPassword && <i className="bx bxs-lock-alt"></i>}
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <div className="register-link">
              <p>
                Don't have an account?
                <a href="#" onClick={(e) => { 
                    e.preventDefault();
                    closeLoginModal(); // Prevent default link behavior
                    openSignUpModal(); // Open SignUp modal
                }} >
                  {" "} Register
                </a>
              </p>
            </div>
          </form>
        </div>
      )}

      {isSignUpOpen && <SignUp closeSignUpModal={closeLoginModal} />}
    </div>
  );
}

export default Login;


