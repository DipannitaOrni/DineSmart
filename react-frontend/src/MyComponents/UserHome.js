import React, { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import "./UserHome.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import { FaCalendarDay, FaUtensils } from "react-icons/fa"; // Icons for meal passes
import QRCode from "qrcode";
const UserHome = () => {
  const [mealPreferences, setMealPreferences] = useState({});
  const [isDiningManager, setIsDiningManager] = useState(null); // State to track if the user is a dining manager
  const navigate = useNavigate();
  // Dummy data for events
  const events = [
    { id: 1, title: "Feast: Thanksgiving Dinner", date: "Nov 25, 2024" },
    { id: 2, title: "Christmas Special Feast", date: "Dec 24, 2024" },
  ];

  // Fetch user's dining manager status
  useEffect(() => {
   const checkDiningManagerStatus = async () => {
   const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      console.error("Student ID not found in localStorage.");
     setIsDiningManager(false);
     return;
     }

    try {
     const response = await axios.get(
        `http://localhost:8080/api/dining/is-assigned/${studentId}`
       );
       setIsDiningManager(response.data); // Assume backend returns true if assigned, false otherwise
     } catch (error) {
       console.error("Error checking dining manager status:", error);
     }
   };

     checkDiningManagerStatus();
   }, []);

  const handleDiningManagement = () => {
    navigate("/dining");
  };
  // Function to format date as dd/mm/yyyy
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB").format(date);
  };
  // Function to generate PDF for meal passes
  const generatePDF = async (mealType, date) => {
    const doc = new jsPDF({ unit: "in", format: [5, 6] });
    doc.setFillColor(255, 255, 255);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );
    doc.setFont("helvetica");
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(53, 140, 133);
    const title = "Meal Pass";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 0.75);
    doc.setDrawColor(53, 140, 133);
    doc.line(0.2, 1, doc.internal.pageSize.width - 0.2, 1);
    const verticalSpacing = 0.1;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    const mealText = `Meal Type: ${mealType}`;
    const mealTextWidth = doc.getTextWidth(mealText);
    doc.text(
      mealText,
      (doc.internal.pageSize.width - mealTextWidth) / 2,
      1.5 + verticalSpacing
    );
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const dateText = `Date: ${formatDate(date)}`;
    const dateTextWidth = doc.getTextWidth(dateText);
    doc.text(
      dateText,
      (doc.internal.pageSize.width - dateTextWidth) / 2,
      2 + verticalSpacing
    );
    const studentName = "Jannatul Chowa";
    const studentID = "2104088";
    doc.setFontSize(12);
    const studentInfoText = `Student: ${studentName} (ID: ${studentID})`;
    const studentInfoTextWidth = doc.getTextWidth(studentInfoText);
    doc.text(
      studentInfoText,
      (doc.internal.pageSize.width - studentInfoTextWidth) / 2,
      2.5 + verticalSpacing
    );
    doc.line(0.2, 3, doc.internal.pageSize.width - 0.2, 3);
    const qrData = JSON.stringify({
        userID: studentID,  // explicitly label it userID here
        mealType,
        date: formatDate(date),
      });
    
      // Generate QR code as Data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);
    
      // Add QR code image to PDF (size: 1.5in x 1.5in)
      const qrX = (doc.internal.pageSize.width - 1.5) / 2;
      const qrY = 3.5; // Below the line
      doc.addImage(qrCodeDataUrl, "PNG", qrX, qrY, 1.5, 1.5);


    doc.save(`${mealType}_Pass_${formatDate(date)}.pdf`);
  };
  // Initialize meal preferences for today
  const today = new Date();
  const initializeMealPreferences = () => {
    setMealPreferences((prev) => ({
      ...prev,
      [formatDate(today)]: prev[formatDate(today)] || {
        lunch: true,
        dinner: true,
      },
    }));
  };
  useEffect(() => {
    initializeMealPreferences();
  }, []);
  return (
    <div className="wrp">
      {isDiningManager === true && ( // Render Dining Manager Panel only if the user is assigned
        <section className="dining-manager-panel">
          <h2 className="section-heading">Dining Control</h2>
          <div className="dining-details">
            <p className="welcome-message">
              🎉 <strong>Congratulations!</strong> You have been selected as the
              Dining Manager.
            </p>
            <p className="duration-info">
              📅 <strong className="duration-label">Budget:</strong> 70000
            </p>
            <p className="duration-info">
              📅 <strong className="duration-label">Duration:</strong> 1 Month
            </p>
            <blockquote className="encouraging-quote">
              "We believe in your leadership! 🏆 Let's make every meal a
              success."
            </blockquote>
            <button className="access-button" onClick={handleDiningManagement}>
              Manage Dining
            </button>
          </div>
        </section>
      )}
      {/* Upcoming Meal Details Section */}
      <section className="upcoming-meal-section">
        <h2 className="section-heading" style={{ marginBottom: "20px" }}>
          Upcoming Meal Details
        </h2>
        <div className="upcoming-meal-content">
          {/* Meal Pass Card */}
          <div className="meal-pass-card today">
            <div className="card-header">
              <FaCalendarDay className="card-icon" />
              <h3 style={{ marginBottom: "5px" }}>
                Meal Pass for Dining Today
              </h3>
            </div>
            <div className="card-buttons">
              {mealPreferences[formatDate(today)]?.lunch ||
              mealPreferences[formatDate(today)]?.dinner ? (
                <>
                  {mealPreferences[formatDate(today)]?.lunch && (
                    <button
                      className="meal-pass-button lunch"
                      onClick={() => generatePDF("Lunch", today)}
                    >
                      Lunch Pass
                    </button>
                  )}
                  {mealPreferences[formatDate(today)]?.dinner && (
                    <button
                      className="meal-pass-button dinner"
                      onClick={() => generatePDF("Dinner", today)}
                    >
                      Dinner Pass
                    </button>
                  )}
                </>
              ) : (
                <p className="no-meals-selected">No meals selected</p>
              )}
            </div>
          </div>

          {/* Upcoming Meal Menu Card */}
          <div className="meal-pass-card upcoming-menu">
            <div className="card-header">
              <FaUtensils className="card-icon" />
              <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
                What's on the Menu ?
              </h3>
            </div>
            <div className="meal-details">
              <p className="meal-time">
                <strong>At 12:30 PM</strong>
              </p>
              <p className="meal-items">Menu: Chicken Curry, Dal, Rice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="summary-section">
        <h2 className="section-heading">Quick Stats</h2>
        <SummaryCard />
      </section>
      {/* Event Section */}
      <section className="event-section">
        <h2 className="section-heading">Upcoming Events</h2>
        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event) => (
              <li
                key={event.id}
                className={`event-item ${
                  event.title.toLowerCase().includes("feast") ? "festive" : ""
                }`}
              >
                <strong>{event.title}</strong>
                {event.title.toLowerCase().includes("feast") && (
                  <span className="festive-icon"> 🎉</span>
                )}{" "}
                <span className="event-date">{event.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events-message">No upcoming events. Stay tuned!</p>
        )}
      </section>

      {/* Support Section */}
      <section className="support">
        <h2>Need Help?</h2>
        <p>
          <a href="/faq">Check our FAQs</a> or{" "}
          <a href="/contact">contact the dining staff</a>.
        </p>
      </section>
    </div>
  );
};

export default UserHome;


