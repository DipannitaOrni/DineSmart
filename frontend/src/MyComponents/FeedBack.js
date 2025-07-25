import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedBack.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const studentId = localStorage.getItem("studentId"); // Get student ID from local storage

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications (responses) from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/student/${studentId}`
      );
      const feedbackResponses = response.data.map((item) => ({
        id: item.feedbackId,
        feedbackDate: item.date,
        mealType: item.mealType,
        description: item.description,
        response: item.diningManagerResponse,
        read: false, // Add logic to track read/unread if needed
        rating: item.rating,
      }));
      setNotifications(feedbackResponses);
      setUnreadCount(feedbackResponses.filter((note) => !note.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      alert("Failed to fetch notifications. Please try again.");
    }
  };

  // Submit feedback to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidFeedback = mealType && date && rating > 0;
    if (!isValidFeedback) {
      alert("Please fill the required fields: Meal Type, Date, and Rating.");
      return;
    }

    try {
      const payload = {
        studentId,
        description: feedback,
        date,
        mealType,
        rating,
      };

      await axios.post("http://localhost:8080/api/feedback/submit", payload);
      setSuccessMessage("Thank you for the Feedback!");

      // Reset fields after submission
      setFeedback("");
      setMealType("");
      setDate("");
      setRating(0);
      fetchNotifications(); // Refresh notifications after feedback submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  // Handle notification icon click
  const handleIconClick = () => {
    setShowModal(true);
    setNotifications((prevNotifications) =>
      prevNotifications.map((note) => ({ ...note, read: true }))
    );
    setUnreadCount(0);
    // Optionally, update backend to mark notifications as read
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rating ? "gold" : "gray",
            fontSize: "20px",
            marginRight: "2px",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">
          Feedback
          <span className="notification-icon" onClick={handleIconClick}>
            🛎️
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </span>
        </h1>
      </div>

      <div className="feedback">
        {/* Feedback Form */}
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mealType">Select Meal Type:</label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">--Select Meal Type--</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() =>
                    setRating((prevRating) => (prevRating === star ? 0 : star))
                  }
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "gray",
                    fontSize: "24px",
                    marginRight: "4px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here... (optional)"
              rows="5"
            />
          </div>
          <button className="submit-btn" type="submit">
            Submit Feedback
          </button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {/* Modal for Responses */}
      {showModal && (
        <div className="fmodal-overlay" onClick={closeModal}>
          <div className="fmodal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Responses</h2>
            <div className="scrollable-content">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <div key={note.id} className="notification-item">
                    <p>
                      <strong>Feedback Date:</strong> {note.feedbackDate}
                    </p>
                    {note.mealType && (
                      <p>
                        <strong>Meal Type:</strong> {note.mealType}
                      </p>
                    )}
                    {note.rating && (
                      <p>
                        <strong>Rating:</strong> {renderStars(note.rating || 0)}
                      </p>
                    )}
                    <p>
                      <strong>Student Feedback:</strong> {note.description}
                    </p>
                    <p>
                      <strong>Response:</strong> {note.response}
                    </p>
                  </div>
                ))
              ) : (
                <p>No responses yet.</p>
              )}
            </div>

            <button className="lclose-btn" onClick={closeModal}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;

