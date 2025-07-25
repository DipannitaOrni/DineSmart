import React, { useState } from "react";
import studentimg from "../images/user.jpg";

const feedbackData = [
  {
    id: 1,
    studentId: "2104126",
    studentName: "Sanjida Eva",
    date: "2024-11-16",
    foodRating: null, // No rating since it's a technical issue
    mealType: null,   // Not applicable for technical issues
    description: "I encountered an issue while trying to toggle my meal status for dinner. The system shows an error message and doesn't update the status.",
    adminResponse: "Thank you for reporting the issue, Eva. Our technical team is looking into it and will resolve it soon. Meanwhile, we’ve manually updated your meal status for dinner."
  },

  // more feedback entries
];

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [showModal, setShowModal] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");

  // Handle delete feedback
  const handleDeleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== id)
      );
    }
  };

  // Handle response button click
  const handleResponseClick = (id) => {
    setCurrentFeedbackId(id);
    const feedback = feedbacks.find((feedback) => feedback.id === id);
    setAdminResponse(feedback.adminResponse || "");
    setShowModal(true);
  };

  // Handle response input change
  const handleResponseChange = (event) => {
    setAdminResponse(event.target.value);
  };

  // Handle submitting the response
  const handleSubmitResponse = () => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === currentFeedbackId
          ? { ...feedback, adminResponse: adminResponse }
          : feedback
      )
    );
    setShowModal(false);
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Feedback Review</h1>
      </div>
      {feedbacks.length === 0 ? (
        <p style={styles.noFeedback}>No feedback available.</p>
      ) : (
        <div style={styles.feedbackList}>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} style={styles.feedbackCard}>
              <div style={styles.feedbackHeader}>
                {/* Profile Section */}
                <div style={styles.profileSection}>
                  <img
                    src={studentimg}
                    alt="Student Avatar"
                    style={styles.profilePic}
                  />
                  <p style={styles.studentId}>{feedback.studentId}</p>
                  <p style={styles.studentName}>{feedback.studentName}</p>
                </div>

                {/* Feedback Details */}
                <div style={styles.feedbackContent}>
                  <div style={styles.feedbackDateRating}>
                    <span style={styles.feedbackDate}>{feedback.date}</span>
                  </div>
                  <div style={styles.feedbackDetails}>
                    <p>
                      <strong>Description:</strong> {feedback.description}
                    </p>
                  </div>
                  <div style={styles.feedbackResponse}>
                    <p>
                      <strong>Admin Response:</strong>
                    </p>
                    <p>
                      {feedback.adminResponse
                        ? feedback.adminResponse
                        : "No response yet."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={styles.feedbackActions}>
                <button
                  onClick={() => handleDeleteFeedback(feedback.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleResponseClick(feedback.id)}
                  style={styles.responseBtn}
                >
                  Respond
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Admin Response */}
      {showModal && (
        <div className="fmodal-overlay">
          <div className="fmodal-content">
            <h2>Enter Admin Response</h2>
            <textarea
              value={adminResponse}
              onChange={handleResponseChange}
              style={styles.modalTextarea}
              placeholder="Type something......"
            />

            <div style={styles.modalActions}>
              <button onClick={handleSubmitResponse} style={styles.submitBtn}>
                Submit Response
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelBtn}
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

// Inline styles for the page
const styles = {
  feedbackList: {
    marginTop: "20px",
  },
  studentName: {
    marginTop: "-9px",  
    fontSize: "14px",  
    fontWeight: "bold", 
    color: "#333", 
  },
  feedbackCard: {
    backgroundColor: "#d7f0ed",
    padding: "10px",
    margin: "10px 0",
    width: "1000px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  feedbackCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
  feedbackHeader: {
    display: "flex",
    width: "100%",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "38px",
    marginLeft: "12px",
    marginTop: "35px",
  },
  profilePic: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    border: "2px solid #2f8c85",
    borderRadius: "8px",
  },
  studentId: {
    marginTop: "14px",
    fontSize: "14px",
    color: "black",
    fontWeight: "bold", // Makes the name stand out
    color: "#333",
  },
  noFeedback: {
    fontSize: "16px",
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "20px",
  },

  feedbackContent: {
    flex: "1",
  },
  feedbackDateRating: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  feedbackDate: {
    marginTop:"10px",
    fontSize: "14px",
    color: "#555",
    fontWeight: "bold",
  },
  feedbackDetails: {
    marginTop:"25px",    
    fontSize: "13px",
    color: "#555",
  },
  feedbackResponse: {
    fontSize: "14px",
    color: "#888",
  },
  feedbackActions: {
    marginTop: "58px",
    display: "flex",
    marginRight: "30px",
    flexDirection: "column",
    gap: "10px",
  },
  deleteBtn: {
    padding: "8px 16px",
    fontFamily: "Poppins",
    fontSize: "14px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  responseBtn: {
    padding: "8px 16px",
    fontSize: "14px",
    fontFamily: "Poppins",
    backgroundColor: "#2F8C85",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },

  // Modal styles

  modalTextarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    resize: "none",
  },
  modalActions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  submitBtn: {
    padding: "8px 16px",
    backgroundColor: "#5cb85c",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default AdminFeedback;
