import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2"; // For graphs
import "chart.js/auto"; // Required for chart.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faExclamationTriangle,
  faComments,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons"; // Icons
import "./DiningDash.css";
import { useNavigate } from 'react-router-dom';
const DiningDash = () => {
  // Data for the charts
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Meal Redemptions",
        data: [50, 75, 60, 90, 120, 85, 100],
        borderColor: "#2f8c85",
        backgroundColor: "rgba(47, 140, 133, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const navigate = useNavigate();
  const handleReturnToProfile = () => {
    navigate('/dashboard');  // Adjust this path to match your routing setup
  };
  const barChartData = {
    labels: ["Rice", "Vegetables", "Meat", "Spices", "Oil"],
    datasets: [
      {
        label: "Inventory Usage",
        data: [40, 30, 50, 20, 35],
        backgroundColor: [
          "#2f8c85",
          "#4db6ac",
          "#26a69a",
          "#00796b",
          "#004d40",
        ],
      },
    ],
  };

  const donutChartData = {
    labels: ["Turned On", "Turned Off"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#2f8c85", "#d7f0ed"],
      },
    ],
  };

  return (
    <div className="content">
      {/* Header */}
      <div className="content--header">
        <h1 className="header-title">Dashboard</h1>
        <button 
        className="access-button"
        onClick={handleReturnToProfile}
      >
        Back to Student Profile
      </button>
      </div>
      <div className="quick-stats">
        <div className="stat-card">
          <FontAwesomeIcon icon={faUtensils} className="icon" />
          Meals Today <span>85</span>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
          Low Stock Items <span>3</span>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faComments} className="icon" />
          Pending Feedback <span>7</span>
        </div>
        <div className="stat-card">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          Next Special Meal <span>Dec 1</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <div className="charts">
          <div className="chart-card">
            <h3>Meal Redemption Trends</h3>
            <Line data={lineChartData} />
          </div>
          <div className="chart-card">
            <h3>Inventory Usage Insights</h3>
            <Bar data={barChartData} />
          </div>
        </div>

        <div className="widgets">
          <div className="widget-card donut">
            <h3>Meal Redemption Progress</h3>
            <Doughnut data={donutChartData} />
          </div>

          <div className="widget-card feedback-card">
            <h3 className="feedback-header">Pending Feedback</h3>
            <ul className="feedback-list">
              <li>
                <span className="feedback-name">John Doe:</span>
                <span className="feedback-comment">"Food was great!"</span>
              </li>
              <li>
                <span className="feedback-name">Jane Smith:</span>
                <span className="feedback-comment">
                  "More variety, please."
                </span>
              </li>
              <li>
                <span className="feedback-name">Dipan Orni:</span>
                <span className="feedback-comment">"No salt in eggs!"</span>
              </li>
              <li>
                <span className="feedback-name">Dipan Orni:</span>
                <span className="feedback-comment">"No salt in eggs!"</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiningDash;
