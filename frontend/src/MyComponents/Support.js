import React from "react";

function Support() {
  const styles = {
    supportSection: {
      padding: "30px",
      backgroundColor: "#f4f9f8",
      border: "1px solid #b3e3db",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      maxWidth: "450px",
      margin: "20px auto",
    },
    supportTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2f8c85",
      marginBottom: "20px",
    },
    supportText: {
      fontSize: "16px",
      color: "#333333",
      marginBottom: "15px",
    },
    supportContact: {
      fontSize: "18px",
      color: "#2f8c85",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    supportSubtext: {
      fontSize: "14px",
      color: "#555555",
      marginBottom: "20px",
    },
    supportButton: {
      display: "inline-block",
      padding: "12px 30px",
      backgroundColor: "#2f8c85",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
  };

  return (
    <div className="support-wrap">
      <div style={styles.supportSection}>
        <h2 style={styles.supportTitle}>Need Assistance?</h2>
        <p style={styles.supportText}>
          If you face any issues, feel free to contact us:
        </p>
        <div style={styles.supportContact}>
          <i className="icon-phone" /> <strong>123-456-7890</strong>
        </div>
        <p style={styles.supportSubtext}>We’re here to help, 24/7!</p>
        <a
          href="tel:1234567890"
          style={styles.supportButton}
        >
          Call Support
        </a>
      </div>
    </div>
  );
}

export default Support;
