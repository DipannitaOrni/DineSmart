import React, { useState } from "react";
import "./Login.css";

function SignUp({ closeSignUpModal }) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [hallName, setHallName] = useState("");
  const [dept, setDept] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!hallName) newErrors.hallName = "Hall Name is required";
    if (!dept) newErrors.dept = "Department is required";
    if (!studentID || !/^\d{7}$/.test(studentID))
      newErrors.studentID = "Student ID must be exactly 7 digits";
    if (!contactNo || !/^\d{11}$/.test(contactNo))
      newErrors.contactNo = "Contact Number must be exactly 11 digits";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirmation Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Signup Details: ", {
        firstName,
        middleName,
        lastName,
        dob,
        hallName,
        dept,
        studentID,
        email,
        contactNo,
        password,
      });
      setShowConfirmation(true);
    }
  };

  const handleStudentIDChange = (event) => {
    const id = event.target.value;
    setStudentID(id);

    if (id) {
      setEmail(`u${id}@student.cuet.ac.bd`);
    } else {
      setEmail("");
    }
  };

  return (
    <div className="sign-up-card">
      <button className="close-btn" onClick={closeSignUpModal}>
        <i className="bx bx-x"></i>
      </button>
      <h1>Sign Up</h1>

      {showConfirmation && (
        <div className="confirmation-message">
          <p>
            🎉 Account created!
            <br /> Ready to dine smart?
            <br /> Head to the login page to get started.
          </p>
        </div>
      )}

      {!showConfirmation && (
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
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
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
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
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
              <option value="Dr. Qudrat-E-Huda Hall">Dr. Qudrat-E-Huda Hall</option>
              <option value="Shahid Mohammad Shah Hall">
                Shahid Mohammad Shah Hall
              </option>
              <option value="Shahid Tareq Huda Hall">Shahid Tareq Huda Hall</option>
              <option value="Sheikh Russel Hall">Sheikh Russel Hall</option>
              <option value="Shamshen Nahar Khan Hall">Shamshen Nahar Khan Hall</option>
              <option value="Sufia Kamal Hall">Sufia Kamal Hall</option>
              <option value="Tapashi Rabeya Hall">Tapashi Rabeya Hall</option>
            </select>
            {errors.hallName && <span className="error-text">{errors.hallName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dept">
              Department: <span>*</span>
            </label>
            <select
              id="dept"
              value={dept}
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
            {errors.studentID && <span className="error-text">{errors.studentID}</span>}
          </div>

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
            {errors.contactNo && <span className="error-text">{errors.contactNo}</span>}
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
            {errors.password && <span className="error-text">{errors.password}</span>}
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
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;



