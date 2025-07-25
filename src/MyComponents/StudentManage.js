import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";


const StudentManage = ({ hallName }) => {
  const [students, setStudents] = useState([]);  // Initialize as empty array
  const [filteredStudents, setFilteredStudents] = useState([]);  // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [formError, setFormError] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMouseEnter = (button) => setHoveredButton(button);
  const handleMouseLeave = () => setHoveredButton(null);

  // Fetch students data on component mount
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios.get(`http://localhost:8080/api/admin/student/${email}`)
        .then(response => {
          console.log("Fetched students:", response.data); // Log the data for debugging
          
          // Check if the 'students' key is an array
          if (Array.isArray(response.data.students)) {
            setStudents(response.data.students);
            setFilteredStudents(response.data.students);
          } else {
            console.error("Fetched data is not an array.");
            setStudents([]);  // Set to empty array if data is not in expected format
            setFilteredStudents([]);
          }
        })
        .catch(error => {
          console.error("There was an error fetching student data:", error);
          setStudents([]);
          setFilteredStudents([]);
        });
    }
  }, []);  // Empty dependency to fetch once when the component mounts

  // Filter students whenever searchTerm or students list changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          student.studentID.toString().includes(searchTerm)  // Filter by student ID
        )
      );
    }
  }, [searchTerm, students]);

  // Handle search term change
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Set student data for editing
  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.studentID === id);
    if (studentToEdit) {
      setEditStudent({ ...studentToEdit });
    }
  };

  // Update student data
  const handleUpdate = (e) => {
    e.preventDefault();
    let errorMessages = {};

    // Validate contact number (must be 11 digits)
    if (!editStudent.contactNo || editStudent.contactNo.length !== 11) {
      errorMessages.contactNo = "Contact number must be exactly 11 digits";
    }

    // Validate room number if type is "alloted"
    if (editStudent.type === "alloted" && !editStudent.roomNumber) {
      errorMessages.roomNumber = "Room number must be filled if alloted";
    }

    // If there are errors, update the error state and stop
    if (Object.keys(errorMessages).length > 0) {
      setFormError(errorMessages);
      return;
    }

    // If no errors, proceed to update
    //const hallName = "Shamshen Nahar Khan Hall"; // Adjust based on logged-in admin
    axios.put(`http://localhost:8080/api/admin/student/student/${editStudent.studentID}`, editStudent)
      .then(response => {
        // Update the students array with the modified student
        const updatedStudents = students.map((student) =>
          student.studentID === editStudent.studentID ? editStudent : student
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setEditStudent(null);  // Clear the edit form
        setFormError({});  // Clear any previous form errors
      })
      .catch(error => {
        console.error("Error updating student data:", error);
      });
  };

  const handleDelete = (id) => {
    console.log("Selected Student ID for deletion:", id); // Log selected ID
    setSelectedStudentId(id);
    setIsModalVisible(true);  // Show confirmation modal
  };
  
  const confirmDelete = () => {
    console.log("Deleting student with ID:", selectedStudentId); // Log before API call
  
    axios.delete(`http://localhost:8080/api/admin/student/student/${selectedStudentId}`)
      .then(response => {
        console.log("Delete response:", response); // Log successful delete response
        const updatedStudents = students.filter(student => student.studentID !== selectedStudentId);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error("Error deleting student:", error); // Log errors if any
      });
  };
  
  
  // Cancel student deletion
  const cancelDelete = () => {
    setIsModalVisible(false);  // Close the modal
  };

  // Handle row click (to edit or unselect)
  const handleRowClick = (id) => {
    if (id === selectedStudentId) {
      setSelectedStudentId(null);
      setEditStudent(null);  // Clear selection if the same student is clicked
    } else {
      setSelectedStudentId(id);
      const studentToEdit = students.find((student) => student.studentID === id);
      if (studentToEdit) {
        setEditStudent({ ...studentToEdit });
      }
    }
  };

  // Handle input changes during student edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setEditStudent((prev) => ({
      ...prev,
      [name]: value,
      // Reset roomNumber if type is changed to "attached"
      ...(name === "residenceType" && value === "attached" ? { roomNumber: "" } : {}),
    }));
  };
  
  const [PendingModal, setPendingModal] = useState(false);
  
    const [pendingRequests, setPendingRequests] = useState([
      { name: "Humayra Zeba", id: "2104010" },
      { name: "Tasmina Jahan", id: "2104122" },
      { name: "Maisha Jannat", id: "2104005" },
      { name: "Julia Mehrin", id: "2104074" },
      { name: "Ria Roy", id: "2104001" },
      { name: "Afra Islam", id: "2104102" },
    ]);
   const handleApprove = (id) => {
  alert("Account approved");

  const approvedStudent = pendingRequests.find(
    (student) => student.id === id
  );

  if (!approvedStudent) {
    alert(`Student with ID: ${id} not found.`);
    return;
  }

const newStudent = {
  studentID: parseInt(id),
  firstName: approvedStudent.name.split(" ")[0],
  middleName: "",
  lastName: approvedStudent.name.split(" ")[1],
  departmentName: "CSE",          
  contactNo: "01812345678",        
  roomNumber: "410",               
  residenceType: "attached",       
  dob: "2002-05-01",
  email: `u${id}@student.cuet.ac.bd`,
};



  setStudents((prev) => [...prev, newStudent]);
  setFilteredStudents((prev) => [...prev, newStudent]);
  setPendingRequests((prev) => prev.filter((student) => student.id !== id));
};
  
    const handleReject = (id, name) => {
      const reason = prompt(
        `Please enter reason for rejecting ${name}'s account:`
      );
      if (reason && reason.trim() !== "") {
        alert(`Account rejected for reason: ${reason}`);
        setPendingRequests((prev) => prev.filter((student) => student.id !== id));
      } else if (reason !== null) {
        // User pressed OK but didn't enter a reason
        alert("Rejection reason is required.");
      }
    };
  return (
    <div className="content">
      <div className="content--header">
        <div className="admin-header">
                  <h1 className="header-title">Student Records</h1>
                  <button
                    style={{}}
                    onClick={() => setPendingModal(true)}
                    className="picon"
                  >
                    <FontAwesomeIcon icon={faUserClock} size="lg" />
                  </button>
                  {PendingModal && (
                    <div className="pmodal-backdrop">
                      <div className="pmodal">
                        <h2>Account Approval Requests</h2>
                        <div className="scrollable-content">
                          {pendingRequests.length > 0 ? (
                            pendingRequests.map((student, index) => (
                              <div key={index} className="request-card">
                                <div className="request-info">
                                  <div className="student-details">
                                    <strong>{student.name}</strong>
                                    <small>ID: {student.id}</small>
                                  </div>
                                  <div className="action-buttons">
                                    <button
                                      className="approve-btn"
                                      title="Approve"
                                      onClick={() => handleApprove(student.id)}
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                      className="reject-btn"
                                      title="Reject"
                                      onClick={() =>
                                        handleReject(student.id, student.name)
                                      }
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No pending requests.</p>
                          )}
                        </div>
                        <button
                          className="lclose-btn"
                          onClick={() => setPendingModal(false)}
                        >
                          <i className="bx bx-x"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
      </div>

      <input
        type="text"
        placeholder="Search by ID..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      {filteredStudents.length === 0 ? (
        <p style={styles.noRecordsMessage}>No records found</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>DOB</th>
                <th style={styles.tableHeader}>Major</th>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Room</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.studentID}
                  style={
                    selectedStudentId === student.studentID
                      ? { ...styles.tableRow, ...styles.selectedRow }
                      : styles.tableRow
                  }
                  onClick={() => handleRowClick(student.studentID)}
                >
                  <td style={styles.tableData}>{student.studentID}</td>
                  <td style={styles.tableData}>
                    {student.firstName} {student.middleName} {student.lastName}
                  </td>
                  <td style={styles.tableData}>{student.dob}</td>
                  <td style={styles.tableData}>{student.departmentName}</td>
                  <td style={styles.tableData}>{student.residenceType}</td>
                  <td style={styles.tableData}>{student.roomNumber || "-"}</td>

                  <td style={styles.tableData}>{student.contactNo}</td>
                  <td
                    style={{ ...styles.tableData, ...styles.emailData }}
                    title={student.email}
                  >
                    <div
                      style={{ ...styles.emailScroll, ...styles.hiddenScroll }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.overflowX = "auto")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.overflowX = "hidden")
                      }
                    >
                      {student.email}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedStudentId && (
  <div style={styles.floatingActions}>
    <button
      style={{
        ...styles.editButton,
        ...(hoveredButton === "edit" ? styles.editButtonHover : {}),
      }}
      onMouseEnter={() => handleMouseEnter("edit")}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleEdit(selectedStudentId)}
    >
      Edit
    </button>
    <button
      style={{
        ...styles.deleteButton,
        ...(hoveredButton === "delete" ? styles.deleteButtonHover : {}),
      }}
      onMouseEnter={() => handleMouseEnter("delete")}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsModalVisible(true)} // Show the modal
    >
      Delete
    </button>
  </div>
)}

{isModalVisible && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      <h3 style={styles.modalHeader}>Confirm Deletion</h3>
      <p>Are you sure you want to delete this student?</p>
      <div style={styles.modalActions}>
        <button
          style={styles.confirmButton}
          onClick={() => {
            confirmDelete(); // Call confirmDelete to handle API deletion
          }}
        >
          Delete
        </button>
        <button
          style={styles.cancelButton}
          onClick={cancelDelete} // Close the modal
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


          {editStudent && (
            <div style={styles.editForm} key={editStudent.id}>
              <h3 style={styles.editHeader}>Edit Student Information</h3>
              <form onSubmit={handleUpdate}>
                <label style={styles.label}>
                  First Name:
                  <input
                    name="firstName"
                    value={editStudent.firstName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </label>
                <label style={styles.label}>
                  Middle Name:
                  <input
                    name="middleName"
                    value={editStudent.middleName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </label>
                <label style={styles.label}>
                  Last Name:
                  <input
                    name="lastName"
                    value={editStudent.lastName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </label>
                <label style={styles.label}>
                  Contact Number:
                  <input
                    name="contactNo"
                    value={editStudent.contactNo}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  {formError?.contactNo && (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "14px",
                        marginTop: "-3px",
                      }}
                    >
                      {formError.contactNo}
                    </p>
                  )}
                </label>
                <label style={styles.label}>
                  Type:
                  <select
                    name="residenceType"
                    value={editStudent.residenceType}
                    onChange={handleInputChange}
                    style={{ ...styles.input, marginBottom: "13px" }}
                  >
                    <option value="alloted">Alloted</option>
                    <option value="attached">Attached</option>
                  </select>
                </label>
                <label style={styles.label}>
                  Room:
                  <input
                    name="roomNumber"
                    value={editStudent.roomNumber}
                    onChange={handleInputChange}
                    style={styles.input}
                    disabled={editStudent.residenceType !== "alloted"} // Disable if not "alloted"
                  />
                  {formError?.room && (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "14px",
                        marginTop: "-3px",
                      }}
                    >
                      {formError.roomNumber}
                    </p>
                  )}
                </label>
                <label style={styles.label}>
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={editStudent.dob}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </label>

                <button type="submit" style={styles.submitButton}>
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: "15px",
  },
  tableHeader: {
    backgroundColor: "#2F8C85",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "#ffffff",
    padding: "500px",
    pointer: "cursor",
  },
  selectedRow: {
    backgroundColor: "#e0f7f5",
  },
  tableData: {
    padding: " 15px 8px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    whiteSpace: "nowrap", // Prevents text wrapping
    fontSize: "15px",
  },
  noRecordsMessage: {
    color: "red", // Red text color for the error message
    fontWeight: "bold", // Bold text for emphasis
    textAlign: "center", // Center the message
    fontSize: "16px", // Font size for readability
    marginTop: "20px", // Space above the message
    marginBottom: "20px", // Space below the message
  },
  floatingActions: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#d7f0ed", // Soft background color
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Slightly stronger shadow for depth
    borderRadius: "12px", // Rounded corners for a more modern look
    padding: "15px", // More padding for a cleaner, spacious look
    display: "flex",
    gap: "15px", // More space between buttons for better visual separation
    zIndex: 1000,
    animation: "fadeIn 0.5s ease-in-out", // Smooth fade-in effect
  },
  editButton: {
    padding: "10px 15px", // Slightly bigger buttons
    fontFamily: "Poppins",
    backgroundColor: "#2F8C85", // Soft green background
    color: "#fff",
    border: "none",
    borderRadius: "8px", // Rounded buttons for a soft, modern look
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease", // Smooth transition on hover
  },
  deleteButton: {
    padding: "10px 15px", // Consistent button size with edit
    fontFamily: "Poppins",
    backgroundColor: "#d9534f", // Red background for delete
    color: "#fff",
    border: "none",
    borderRadius: "8px", // Rounded corners
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease", // Smooth transition on hover
  },
  editButtonHover: {
    backgroundColor: "#1a6c5d", // Darker green on hover for edit
    transform: "scale(1.05)", // Slight scale effect on hover
  },
  deleteButtonHover: {
    backgroundColor: "#c9302c", // Darker red on hover for delete
    transform: "scale(1.05)", // Slight scale effect on hover
  },
  // Add keyframes for the fade-in effect
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },

  emailData: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px", // Column width limit
    position: "relative",
    paddingTop: "15px",
    cursor: "pointer",
    paddingLeft: "20px",
  },
  emailScroll: {
    overflowX: "auto", // Enable horizontal scrolling
    display: "block", // Make it block to ensure full width
    maxWidth: "150px", // Ensure maxWidth is consistent with the column width
    whiteSpace: "nowrap", // Prevent text from wrapping
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
    width: "100%", // Allow the container to take full available space
  },
  hiddenScroll: {
    "&::-webkit-scrollbar": {
      display: "none", // Hide the scrollbar but allow scrolling in webkit browsers
    },
  },
  editForm: {
    marginTop: "10px",
    padding: "15px",
    border: "1px solid #2F8C85",
    borderRadius: "8px",

    backgroundColor: "#e8f6f3",
  },
  editHeader: {
    color: "#2F8C85",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    marginTop: "5px",
  },
  label: {
    display: "block",
    margin: "15px 0",
    color: "#003153",
  },
  input: {
    padding: "8px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #2F8C85",
    marginTop: "5px",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#2F8C85",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },

  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #2F8C85",
    width: "100%",
    marginBottom: "20px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.)",
  },
  modalHeader: {
    marginBottom: "12px",
    color: "#2f8c85",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  confirmButton: {
    padding: "10px 15px", // Consistent button size with edit
    fontFamily: "Poppins",
    backgroundColor: "#d9534f", // Red background for delete
    color: "#fff",
    border: "none",
    borderRadius: "8px", // Rounded corners
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease", 
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: "10px 15px", // Consistent button size with edit
    fontFamily: "Poppins",
    backgroundColor: "#2f8c85", // Red background for delete
    color: "#fff",
    border: "none",
    borderRadius: "8px", // Rounded corners
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease", 
  },
};

export default StudentManage;


