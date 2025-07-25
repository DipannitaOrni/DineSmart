import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [historyData, setHistoryData] = useState([]); // State for meal history data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const headerStyles = {
    padding: "10px",
    backgroundColor: "#2F8C85",
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const cellStyles = {
    padding: "10px",
    borderBottom: "1px solid #ddd", // Default border for most cells
  };

  const dateCellStyles = {
    ...cellStyles,
    fontWeight: "bold",
    color: "#003153",
    borderBottom: "1px solid #ddd", // Border for the date cell
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) { // Ensure case-insensitive comparison
      case "on":
        return "#4CAF50"; // Green for "On"
      case "off":
        return "#F44336"; // Red for "Off"
      default:
        return "#333"; // Default color
    }
  };

  // Fetch meal history data for a specific student from backend
  useEffect(() => {
    const fetchHistoryData = async () => {
      const studentId = localStorage.getItem("studentId"); // Retrieve studentId from localStorage
      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/mealHistory/student/${studentId}` // Include studentId in the API endpoint
        );
        const processedData = response.data.map((entry) => ({
          ...entry,
          meals: entry.meals || [], // Ensure meals is always an array
        }));
        setHistoryData(processedData); // Set the fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching meal history:", error);
        setError("Failed to load meal history data.");
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchHistoryData();
  }, []);

  // Render loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!historyData || historyData.length === 0) return <p>No meal history available.</p>;

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Meal History</h1>
      </div>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={headerStyles}>Date</th>
            <th style={headerStyles}>Meal Type</th>
            <th style={headerStyles}>Status</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((entry, index) => (
            <React.Fragment key={index}>
              {entry.meals &&
                entry.meals.map((meal, mealIndex) => (
                  <tr key={mealIndex}>
                    {mealIndex === 0 && (
                      <td style={dateCellStyles} rowSpan={entry.meals.length}>
                        {entry.date}
                      </td>
                    )}
                    <td
                      style={{
                        ...cellStyles,
                        borderBottom: mealIndex === entry.meals.length - 1 ? "1px solid #ddd" : "none", // Remove border for all but the last row
                      }}
                    >
                      {meal.type}
                    </td>
                    <td
                      style={{
                        ...cellStyles,
                        color: getStatusColor(meal.status),
                        fontWeight: "bold",
                        borderBottom: mealIndex === entry.meals.length - 1 ? "1px solid #ddd" : "none", // Remove border for all but the last row
                      }}
                    >
                      {meal.status.charAt(0).toUpperCase() + meal.status.slice(1).toLowerCase()}
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;

