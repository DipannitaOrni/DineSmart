import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for API calls
import "./AdminDashboard.css";
import BangabandhuHall from "../images/Bangabandhu_Hall.jpg";
import TareqHudaHall from "../images/Tareq_Huda_Hall.jpg";
import ShamshenNaharKhanHall from "../images/Shamshen_Nahar_Khan_Hall.jpg";
import TapashiRabeyaHall from "../images/Tapashi_Rabeya_Hall.jpg";
import AdminFeedback from './AdminFeedback';

import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const donutChartRef = useRef(null);

  const profilePictures = {
    "bangabandhuhall@cuet.ac.bd": BangabandhuHall,
    "shahidtareqhudahall@cuet.ac.bd": TareqHudaHall,
    "shamshennaharkhanhall@cuet.ac.bd": ShamshenNaharKhanHall,
    "tapashirabeyahall@cuet.ac.bd": TapashiRabeyaHall,
  };
  useEffect(() => {
    const adminEmail = localStorage.getItem('email'); // Retrieve email from localStorage

    if (adminEmail) {
      axios
        .get(`http://localhost:8080/api/admins/profile`, {
          headers: {
            Authorization: adminEmail, // Pass email in headers for backend authentication
          },
        })
        .then((response) => {
          setAdminProfile(response.data); // Update admin profile data
        })
       
        
        .catch((error) => {
          console.error("Error fetching admin profile:", error);
        });
    }
  }, []);
  

  // Sample data for the bar chart (total meals per month)
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Meals Redeemed",
        data: [1200, 1900, 3000, 2500, 2200, 3200, 2900],
        backgroundColor: "rgba(47, 140, 133,0.9)",
      },
    ],
  };

  // Sample data for the donut chart (active vs non-active users)
  const donutData = {
    labels: ["Active Users", "Non-active Users"],
    datasets: [
      {
        data: [321, 150],
        backgroundColor: ["#2F8C85", "#FF6384"],
      },
    ],
  };

  // Sample data for the line chart
  const lineData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Meals This Week",
        data: [200, 300, 250, 400, 320, 450, 500],
        borderColor: "rgb(47, 140, 133)",
        fill: false,
      },
    ],
  };

  return (
    <div className="adashboard">
      <h1>Admin Dashboard</h1>

      {/* Check if profile data has been fetched */}
      {adminProfile ? (
  <div className="profile-section">
    <div className="profile-left">
      {/* Check if the email exists in profilePictures and render the image */}
      {adminProfile.email in profilePictures && (
        <img
          src={profilePictures[adminProfile.email]}
          alt="Profile"
          className="hall-image"
        />
      )}

      <div className="hall-details">
        <h2 className="hall-name">{adminProfile.hallName}</h2>
        <ul className="hall-info-list">
          <li className="hall-info-item">
            <i className="fas fa-envelope hall-icon"></i> {/* Email Icon */}
            <span className="email">Email: {adminProfile.email}</span>
          </li>
          <li className="hall-info-item">
            <i className="fas fa-phone hall-icon"></i> {/* Phone Icon */}
            <span className="phone">Contact: {adminProfile.contact}</span>
          </li>
        </ul>
        <p className="hall-desc">{adminProfile.description}</p>
      </div>
    </div>
  </div>
) : (
  <p>Loading profile...</p> // Show loading text while fetching data
)}


      <div className="stats-overview">
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-users"></i> {/* Total Users icon */}
          </div>
          <h3>Total Users</h3>
          <p>500</p>
        </div>
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-dollar-sign"></i> {/* Revenue icon */}
          </div>
          <h3>Total Revenue</h3>
          <p>$8,542</p>
        </div>
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-user-check"></i> {/* Active Students icon */}
          </div>
          <h3>Active Students</h3>
          <p>321</p>
        </div>
        <div className="stat-card">
          <div className="icon">
            <i className="fas fa-tasks"></i> {/* Pending Requests icon */}
          </div>
          <h3>Pending Requests</h3>
          <p>45</p>
        </div>
      </div>

      <div className="chart-section">
        <div className="line-chart">
          <h3 className="chart-title">Total Meals Taken This Week</h3>
          <Line
            ref={lineChartRef}
            data={lineData}
            options={{
              maintainAspectRatio: false, // Allow the chart to not maintain its aspect ratio
              responsive: true, // Enable responsiveness
            }}
          />
        </div>
        <div className="donut-chart">
          <h4>Active vs Non-active Users</h4>
          <Doughnut ref={donutChartRef} data={donutData} />
        </div>
      </div>

      <div className="bottom-charts">
        <div className="bar-chart">
          <h4>Meals Redeemed Over Past Months</h4>
          <Bar
            ref={barChartRef}
            data={barData}
            options={{
              maintainAspectRatio: false, // Allow the chart to not maintain its aspect ratio
              responsive: true, // Enable responsiveness
              layout: {
                padding: {
                  left: 0,
                  right: 20,
                  top: 20,
                  bottom: 60, // Add padding to the bottom
                },
              },
              scales: {
                x: {
                  ticks: {
                    padding: 10, // Add padding to the x-axis labels
                  },
                },
                y: {
                  beginAtZero: true, // Ensure the y-axis starts at zero
                },
              },
            }}
          />
        </div>
        <div className="recent-feedback">
          <h4>Recent Feedback</h4>
          <ul>
            <li className="feedback-item">
              <div className="feedback-info">
                <div className="feedback-student">
                  <div className="student-id">#2104114</div>
                  <div className="student-name">Tahmima Eid</div>
                </div>
                <div className="feedback-date">10:30 AM</div>
                <div className="feedback-message">
                  "The food quality has been great!"
                </div>
              </div>
            </li>
            <li className="feedback-item">
              <div className="feedback-info">
                <div className="feedback-student">
                  <div className="student-id">#2104074</div>
                  <div className="student-name">Fawzia Maria</div>
                </div>
                <div className="feedback-date">11:00 AM</div>
                <div className="feedback-message">
                  "Could we have more vegetarian options?"
                </div>
              </div>
            </li>
            <li className="feedback-item">
              <div className="feedback-info">
                <div className="feedback-student">
                  <div className="student-id">#2104126</div>
                  <div className="student-name">Sanjida Eva</div>
                </div>
                <div className="feedback-date">12:15 PM</div>
                <div className="feedback-message">
                  "The serving time could be a bit faster."
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

