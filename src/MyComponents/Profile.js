import React, { useEffect, useState } from 'react';
import './Profile.css'; // Ensure this CSS file contains the necessary styles
import userimg from '../images/user.jpg'; // Default image
import axios from 'axios';

const Profile = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(userimg); // To store the profile picture URL
  const [imageFile, setImageFile] = useState(null); // To store the selected file

  // Function to extract student ID from email
  const extractStudentId = (email) => {
    const emailPrefix = email.split('@')[0]; // Get the part before '@'
    const studentId = emailPrefix.slice(1); // Remove the 'u' from the beginning
    return studentId;
  };

  // Fetch student profile on component mount
  const fetchProfile = async () => {
    const email = localStorage.getItem('email');

    if (!email) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/students/profile", {
        params: { email },
      });

      setStudentData(response.data);
      setProfilePic(response.data.profilePic || userimg);
      const hallName = response.data.hallName;
      const fullName = `${response.data.firstName} ${response.data.middleName || ''} ${response.data.lastName}`.trim();

      // Extract and store studentId in localStorage
      const studentId = extractStudentId(email);
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('hallName', hallName);
       // Store the name in local storage

    localStorage.setItem('userName', fullName);
    console.log("User Name stored in localStorage:", fullName);
      console.log("Student ID stored in localStorage:", studentId);
      console.log("Hall Name stored in localStorage:", hallName);
    } catch (err) {
      setError("Error fetching profile.");
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile(); // Call fetchProfile when the component mounts
  }, []);

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the preview of the selected image
        setImageFile(file); // Store the selected file for upload
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };

  // Handle profile picture upload
  const handleProfilePicUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', imageFile); // Append the file to the form data

    try {
      const email = localStorage.getItem('email');
      await axios.post("http://localhost:8080/api/students/uploadProfilePic", formData, {
        params: { email },
      });

      alert("Profile picture updated successfully!");
      fetchProfile(); // Reload the profile after upload to show the new picture
    } catch (err) {
      alert("Error uploading profile picture.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName,middleName, departmentName, dob, hallName, residenceType, roomNumber, contactNo, email } = studentData;

  // Extract student ID from email
  const studentId = extractStudentId(email);

  return (
    <div className='profile'>
      {/* Profile Header */}
      <div className="profile--header">
        <h2 className="header--title">Profile</h2>
      </div>

      {/* Info Card */}
      <div className='info-card'>
        <div className='user-photo'>
          <div className="image-container">
            <img src={profilePic} alt="User" className='user-image' />
            <label htmlFor="file-input" className="camera-icon">
              <i className="fas fa-camera"></i>
            </label>
          </div>
          <input 
            type="file" 
            id="file-input"
            accept="image/*"
            style={{ display: 'none' }} // Hide file input
            onChange={handleImageChange} 
          />
        </div>
        <div className='user-details'>
          <h3 className="username">{firstName} {middleName} {lastName}</h3>
        </div>
        <div className='additional-info'>
          <div className='info-item'>
            <strong>ID </strong><span className='colon'>:</span><span>{studentId}</span>
          </div>
          <div className='info-item'>
            <strong>Major</strong><span className='colon'>:</span><span>{departmentName}</span>
          </div>
          <div className='info-item'>
            <strong>DOB</strong><span className='colon'>:</span><span>{dob}</span>
          </div>
          <div className='info-item'>
            <strong>Hall</strong><span className='colon'>:</span><span>{hallName}</span>
          </div>
          <div className='info-item'>
            <strong>Type</strong><span className='colon'>:</span><span>{residenceType}</span>
          </div>
          {residenceType === 'alloted' && roomNumber && (
            <div className='info-item'>
              <strong>Room</strong><span className='colon'>:</span><span>{roomNumber}</span>
            </div>
          )}
          <div className='info-item'>
            <strong>Contact</strong><span className='colon'>:</span><span>{contactNo}</span>
          </div>
          <div className='info-item'>
            <strong>Email</strong><span className='colon'>:</span><span className='mail'>{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;





