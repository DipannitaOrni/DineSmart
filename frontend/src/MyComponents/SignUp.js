import axios from 'axios';
import React, { useState } from "react";
import "./Login.css";

function SignUp({ closeSignUpModal }) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [hallName, setHallName] = useState("");
  const [departmentName, setDept] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [residenceType, setResidenceType] = useState(""); 
  const [roomNumber, setRoomNumber] = useState("");

  // Handle student ID change
  const handleStudentIDChange = (e) => {
    const id = e.target.value;
    setStudentID(id);

    // Generate email based on student ID
    if (id) {
      setEmail(`u${id}@student.cuet.ac.bd`);
    } else {
      setEmail(""); // Clear email if student ID is empty
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!hallName) newErrors.hallName = "Hall Name is required";
    if (!departmentName) newErrors.dept = "Department is required";
    if (!studentID || !/^\d{7}$/.test(studentID))
      newErrors.studentID = "Student ID must be exactly 7 digits";
    if (!contactNo || !/^\d{11}$/.test(contactNo))
      newErrors.contactNo = "Contact Number must be exactly 11 digits";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirmation Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!residenceType) newErrors.residenceType = "Residence Type is required";
    if (residenceType === "Alloted" && !roomNumber) {
      newErrors.roomNumber = "Room Number is required for allotted students";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted");

  // Ensure the form is validated before proceeding
  if (validateForm()) {
    console.log("Form is valid, sending data...");

    // Check if residenceType is 'Allotted' and roomNumber is not empty
    if (residenceType === 'Allotted' && !roomNumber) {
      alert("Room Number is required when Residence Type is 'Allotted'");
      return;  // Prevent submission if room number is missing
    }

    // Create userData with roomNumber only if residenceType is 'Allotted'
    const userData = {
      firstName,
      middleName,
      lastName,
      dob,
      hallName,
      departmentName,
      studentID,
      email,
      residenceType: residenceType === "Alloted" ? "alloted" : "attached", // Match backend values
      roomNumber: residenceType === "Alloted" ? roomNumber : null, // Only add roomNumber if 'Alloted'
      contactNo,
      password,
    };
    

    try {
      console.log("Sending data...", userData); // Log the data being sent to the backend

      // Send the data via POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/api/students/signup",

      
        
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response object and data for debugging
      console.log("Full Response:", response); 
      console.log("Response Data:", response.data);
      

      // Update showConfirmation to true after successful signup
      setShowConfirmation(true);

      // Handle success message based on the response
      if (typeof response.data === 'string') {
        alert(`Signup Successful: ${response.data}`); // Show success message if data is a string
      } else if (response.data.message) {
        alert(`Signup Successful: ${response.data.message}`); // Show success message if it contains a message field
      } else {
        alert("Signup response received but no message found.");
      }
    } catch (error) {
      console.error("Error during signup:", error); // Log the error for debugging
    
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
      } else if (error.request) {
        console.error("No response from backend:", error.request);
        alert("Error: No response from the server. Please try again later.");
      } else {
        console.error("Request Setup Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  }
};

  

const handleResidenceChange = (e) => {
  setResidenceType(e.target.value);
  setErrors((prevErrors) => ({ ...prevErrors, residenceType: "" })); // Clear error when value is set
};

  return (
    <div className="sign-up-card">
      <button className="close-btn" onClick={closeSignUpModal}>
        <i className="bx bx-x"></i>
      </button>
      <h1>Sign Up</h1>
  
      {console.log("Show Confirmation:", showConfirmation)} {/* Debugging */}
      
      {showConfirmation ? (
        <div className="modal-overlay" onClick={closeSignUpModal}>
          <div
            className="confirmation-message"
            onClick={(e) => e.stopPropagation()}
          >
<p>
              🎉 Account request received
              <br /> You'll be notified once your account is activated.
            </p>
          </div>
        </div>
      ) : (
        <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">
              First Name: <span>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={errors.firstName ? "error-border" : ""}
            />
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="middleName">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name: <span>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? "error-border" : ""}
            />
            {errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dob">
              Date of Birth: <span>*</span>
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={errors.dob ? "error-border" : ""}
            />
            {errors.dob && <span className="error-text">{errors.dob}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="departmentName">
              Department: <span>*</span>
            </label>
            <select
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDept(e.target.value)}
              className={errors.dept ? "error-border" : ""}
            >
              <option value="">Select Department</option>
              <option value="EEE">EEE</option>
              <option value="CE">CE</option>
              <option value="CSE">CSE</option>
              <option value="ME">ME</option>
              <option value="MIE">MIE</option>
              <option value="BME">BME</option>
              <option value="ETE">ETE</option>
              <option value="URP">URP</option>
              <option value="WRE">WRE</option>
              <option value="PME">PME</option>
              <option value="MME">MME</option>
              <option value="Archi">Archi</option>
            </select>
            {errors.dept && <span className="error-text">{errors.dept}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="studentID">
              Student ID: <span>*</span>
            </label>
            <input
              type="text"
              id="studentID"
              value={studentID}
              onChange={handleStudentIDChange}
              className={errors.studentID ? "error-border" : ""}
            />
            {errors.studentID && (
              <span className="error-text">{errors.studentID}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="hall-name">
              Hall Name: <span>*</span>
            </label>
            <select
              id="hall-name"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              className={errors.hallName ? "error-border" : ""}
            >
              <option value="">Select Hall</option>
              <option value="Bangabandhu Hall">Bangabandhu Hall</option>
              <option value="Dr. Qudrat-E-Huda Hall">
                Dr. Qudrat-E-Huda Hall
              </option>
              <option value="Shahid Mohammad Shah Hall">
                Shahid Mohammad Shah Hall
              </option>
              <option value="Shahid Tareq Huda Hall">
                Shahid Tareq Huda Hall
              </option>
              <option value="Sheikh Russel Hall">Sheikh Russel Hall</option>
              <option value="Shamshen Nahar Khan Hall">
                Shamshen Nahar Khan Hall
              </option>
              <option value="Sufia Kamal Hall">Sufia Kamal Hall</option>
              <option value="Tapashi Rabeya Hall">Tapashi Rabeya Hall</option>
            </select>
            {errors.hallName && (
              <span className="error-text">{errors.hallName}</span>
            )}
          </div>
          <div className="form-group">
  <label htmlFor="residenceType">
    Residence Type: <span>*</span>
  </label>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="residenceType"
        value="Alloted"
        onChange={handleResidenceChange}
        id="alloted"
      />
      Alloted
    </label>
    <label>
      <input
        type="radio"
        name="residenceType"
        value="Attached"
        onChange={handleResidenceChange}
        id="attached"
      />
      Attached
    </label>
  </div>
  {errors.residenceType && (
    <span className="error-text">{errors.residenceType}</span>
  )}
</div>

{residenceType === "Alloted" && (
  <div className="form-group">
    <label htmlFor="roomNumber">Room Number:</label>
    <input
      type="text"
      className="form-control"
      id="roomNumber"
      name="roomNumber"
      placeholder="Enter your room number"
      value={roomNumber}
      onChange={(e) => setRoomNumber(e.target.value)} // Handle change
      required
    />
  </div>
)}




          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="contactNo">
              Contact Number: <span>*</span>
            </label>
            <input
              type="tel"
              id="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className={errors.contactNo ? "error-border" : ""}
            />
            {errors.contactNo && (
              <span className="error-text">{errors.contactNo}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password: <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "error-border" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password: <span>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "error-border" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
        </>
      )}
    </div>
 );
}

export default SignUp;

