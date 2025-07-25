import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import managerimg from "../images/user.jpg";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DiningManager = () => {
  const [diningManagerDetails, setDiningManagerDetails] = useState({
    name: "",
    email: "",
    budget: "",
    duration: "",
  });
  const [seniorStudents, setSeniorStudents] = useState([]);
  const [previousManagers] = useState([
    { id: 2104125, name: "John Doe", month: "October 2024", ratings: "85%" },
    { id: 2104131, name: "Jane Smith", month: "September 2024", ratings: "90%" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const hallName = localStorage.getItem("hallName"); // Fetch hall name from localStorage
  console.log("Hall Name:", localStorage.getItem("hallName"));

  // Fetch dining manager details and senior students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerDetailsRes = await axios.get(`http://localhost:8080/api/dining/details/${hallName}`);
const seniorStudentsRes = await axios.get(`http://localhost:8080/api/students/starting-with-19/${hallName}`);
;

        setDiningManagerDetails(managerDetailsRes.data);
        setSeniorStudents(seniorStudentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [hallName]);

  // Filter students based on the search term
  const filteredStudents = seniorStudents.filter((student) =>
    student.studentID.toString().includes(searchTerm)
  );

  // Handle assigning a dining manager
  const handleAssignManager = async (studentId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/dining/assign",
        {
          studentId,
          hallName,
        }
      );
      alert(`Student with ID: ${studentId} has been assigned as Dining Manager!`);
      setDiningManagerDetails(response.data); // Update dining manager details
    } catch (error) {
      console.error("Error assigning dining manager:", error);
      alert("Failed to assign dining manager. Please try again.");
    }
  };

  // Pie chart data for performance metrics
  const performanceMetrics = {
    foodWaste: 10, // In percentage
    mealRedemptionRate: 85, // Percentage of students who redeemed meals
    mealCostEfficiency: 90, // In percentage
  };

  const chartData = {
    labels: ["Food Waste", "Meal Redemption Rate", "Meal Cost Efficiency"],
    datasets: [
      {
        data: [
          performanceMetrics.foodWaste,
          performanceMetrics.mealRedemptionRate,
          performanceMetrics.mealCostEfficiency,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const styles = {
    detailsCard: {
      backgroundColor: "#D7F0ED",
      padding: "20px",
      marginLeft: "-3px",
      width: "100px",
      height: "320px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
      marginBottom: "5px",
      marginTop: "25px",
      flex: 2,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    detailsTitle: {
      color: "#2F8C85",
      marginBottom: "30px",
    },
    detailsLabel: {
      color: "#003153",
    },
    detailsSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "90px",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "auto auto 1fr",
      rowGap: "20px",
      columnGap: "10px",
      alignItems: "center",
    },
    colon: {
      textAlign: "center",
      color: "#003153",
    },
    diningManagerImage: {
      width: "120px",
      height: "120px",
      marginTop: "-39px",
      borderRadius: "50%",
      marginRight: "12px",
      objectFit: "cover",
      border: "3px solid #48a399",
    },
    performanceCard: {
      backgroundColor: "#D7F0ED",
      padding: "7px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
      marginBottom: "20px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      marginTop: "25px",
      marginLeft: "25px",
      justifyContent: "flex-start",
      alignItems: "center",
      maxWidth: "350px",
      minHeight: "320px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
    },
    studentCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
      padding: "12px 16px",
      borderRadius: "12px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      fontWeight: "500",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      marginBottom: "12px",
      cursor: "pointer",
      overflow: "hidden",
    },
    studentName: {
      color: "#2F4F4F",
      fontWeight: "600",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Dining Manager</h1>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={styles.detailsCard} className="card-hover">
          <h3 style={styles.detailsTitle}>Dining Manager Details</h3>
          <div style={styles.detailsSection}>
            <div style={styles.detailsGrid}>
              <div style={styles.detailsLabel}>
                <strong>Name</strong>
              </div>
              <div style={styles.colon}>:</div>
              <div>{diningManagerDetails.name || "N/A"}</div>

              <div style={styles.detailsLabel}>
                <strong>Email</strong>
              </div>
              <div style={styles.colon}>:</div>
              <div>{diningManagerDetails.email || "N/A"}</div>

              <div style={styles.detailsLabel}>
                <strong>Budget</strong>
              </div>
              <div style={styles.colon}>:</div>
              <div>{diningManagerDetails.budget || "N/A"}</div>

              <div style={styles.detailsLabel}>
                <strong>Duration</strong>
              </div>
              <div style={styles.colon}>:</div>
              <div>{diningManagerDetails.duration || "N/A"}</div>
            </div>
            <img
              src={managerimg}
              alt="Dining Manager"
              style={styles.diningManagerImage}
            />
          </div>
        </div>

        <div style={styles.performanceCard} className="card-hover">
          <h3 style={styles.detailsTitle}>Performance Metrics</h3>
          <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "9px", marginBottom: "35px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ color: "#2F8C85", fontSize: "22px" }}>Assign Dining Manager</h3>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 20px",
              borderRadius: "25px",
              border: "0.5px solid #2F8C85",
              width: "300px",
              fontSize: "14px",
              outline: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              transition: "box-shadow 0.3s ease",
            }}
          />
        </div>

        <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px" }}>
          {filteredStudents.map((student) => (
            <div key={student.studentID} style={styles.studentCard}>
              <span style={styles.studentName}>
                {student.name} (ID: {student.studentID})
              </span>

              <button
                onClick={() => handleAssignManager(student.studentID)}
                style={{
                  backgroundColor: "#2f8c85",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  width: "100px",
                }}
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: "#2F8C85", fontSize: "22px" }}>Previous Dining Managers</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#2F8C85", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Month</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Ratings</th>
            </tr>
          </thead>
          <tbody>
            {previousManagers.map((manager) => (
              <tr key={manager.id}>
                <td style={{ padding: "12px" }}>{manager.id}</td>
                <td style={{ padding: "12px" }}>{manager.name}</td>
                <td style={{ padding: "12px" }}>{manager.month}</td>
                <td style={{ padding: "12px" }}>{manager.ratings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiningManager;
;
