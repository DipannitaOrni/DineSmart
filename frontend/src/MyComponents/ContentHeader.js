import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const ContentHeader = () => {
  const [userName, setUserName] = useState("");

  // Retrieve the name from local storage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || ""); // Fallback to an empty string if no name is found
  }, []);

  return (
    <div className="content-header">
      {/* Dashboard Title and Search Bar */}
      <div className="header-details">
        <h1 className="header-title">Dashboard</h1>
        <div className="header-activity">
          <div className="search-box">
          </div>
        </div>
      </div>

      {/* Welcome Banner Section */}
      <section className="welcome-banner">
        <h1>WELCOME {userName.toUpperCase()}!</h1>
        <p>Manage your meals and dining with ease.</p>
      </section>
    </div>
  );
};

export default ContentHeader;

