import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiDish,
  BiHome,
  BiHistory,
  BiWallet,
  BiUser,
  BiComment,
  BiCog,
  BiLogOut,
  BiChart,
  BiIdCard,
  BiRestaurant,
  BiStoreAlt,
  BiMenu,
} from "react-icons/bi";
import "./SideBar.css";

const SideBar = ({ isAdmin, isDiningManager }) => {
  const navigate = useNavigate();
  const [showMenuSubmenu, setShowMenuSubmenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const toggleMenuSubmenu = () => {
    setShowMenuSubmenu(!showMenuSubmenu);
  };

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Open logout confirmation modal
  const openModal = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsModalOpen(true);
  };

  // Close logout confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dmenu">
      <div className="dlogo">
        <BiDish className="logo-icon" />
        <h2 className="dinesmart">DineSmart</h2>
      </div>

      <div className="menu--list">
        {/* Common Link for Dashboard */}
        <Link
          to={isAdmin ? "/admin" : isDiningManager ? "/dining" : "/dashboard"}
          className="ditem"
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        {/* Admin-specific links */}
        {isAdmin && (
          <>
            <Link to="/admin/students" className="ditem">
              <BiUser className="icon" />
              Student Records
            </Link>
            <Link to="/admin/dining-manager" className="ditem">
              <BiUser className="icon" />
              Dining Manager
            </Link>
            <Link to="/admin/transactions" className="ditem">
              <BiWallet className="icon" />
              Transactions
            </Link>
          </>
        )}

        {/* Dining Manager-specific links */}
        {isDiningManager && (
          <>
            <Link to="/dining/inventory" className="ditem">
              <BiStoreAlt className="icon" />
              Inventory
            </Link>
            <Link to="/dining/meal-status" className="ditem">
              <BiRestaurant className="icon" />
              Meals
            </Link> 
            <Link to="/dining/status" className="ditem">
              <BiMenu className="icon" />
              Status
            </Link>
            <Link to="/dining/feedback" className="ditem">
              <BiComment className="icon" />
              Feedback
            </Link>
          </>
        )}

        {/* Regular User-specific links */}
        {!isAdmin && !isDiningManager && (
          <>
            <Link to="/mealcalender" className="ditem">
              <BiWallet className="icon" />
              Meal Calendar
            </Link>
            <Link to="/history" className="ditem">
              <BiHistory className="icon" />
              History
            </Link>
            <Link to="/payment" className="ditem">
              <BiWallet className="icon" />
              Payment
            </Link>
            <Link to="/feedback" className="ditem">
              <BiComment className="icon" />
              Feedback
            </Link>
            <Link to="/settings" className="ditem">
              <BiCog className="icon" />
              Settings
            </Link>
          </>
        )}

        {/* Logout link */}
        <Link to="#" onClick={openModal} className="ditem">
          <BiLogOut className="icon" />
          Logout
        </Link>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              background: "#2f8c85", // Gradient background for modal
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
              color: "white",
              maxWidth: "450px",
              width: "100%",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
              Are you sure you want to log out?
            </h2>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "#d7f0ed",
                  color: "#2f8c85",
                  fontSize: "16px",
                  margin: "0 15px",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#b5d8cd"; // Light mint green for hover
                  e.target.style.color = "#2f8c85"; // Text color remains consistent
                  e.target.style.transform = "scale(1.05)"; // Slight scale for hover effect
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#d7f0ed"; // Reset to original background
                  e.target.style.color = "#2f8c85"; // Reset text color
                  e.target.style.transform = "scale(1)"; // Reset scale
                }}
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  backgroundColor: "#d7f0ed",
                  color: "#2f8c85",
                  fontSize: "16px",
                  margin: "0 15px",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#b5d8cd"; 
                  e.target.style.color = "#2f8c85"; 
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#d7f0ed"; // Reset to original background
                  e.target.style.color = "#2f8c85"; // Reset text color
                  e.target.style.transform = "scale(1)"; // Reset scale
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
