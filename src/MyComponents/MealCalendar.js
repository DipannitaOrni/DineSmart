import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./MealCalendar.css";

const MealCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [mealPreferences, setMealPreferences] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [studentId, setStudentId] = useState(null);

  // Fetch studentId from localStorage
  const fetchStudentId = async () => {
    try {
      const storedStudentId = localStorage.getItem("studentId");
      if (storedStudentId) {
        setStudentId(storedStudentId);
        console.log("Using stored studentId:", storedStudentId); // Debug log
      } else {
        console.error("No studentId found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching student ID:", error);
    }
  };

  useEffect(() => {
    fetchStudentId();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateEditable = (selectedDate) => {
    const today = new Date();
    const todayMidnight = today.setHours(0, 0, 0, 0);
    const selectedMidnight = selectedDate.setHours(0, 0, 0, 0);
    return selectedMidnight > todayMidnight; // Allow editing for tomorrow and beyond
  };

  const handleDateChange = (date) => {
    if (!isDateEditable(date)) {
      setErrorMessage(
        `The selected date (${formatDate(date)}) cannot be edited. The deadline has passed.`
      );
      setShowModal(false);
    } else {
      setErrorMessage("");
      setValue(date);
      setShowModal(true);
      setMealPreferences((prev) => ({
        ...prev,
        [formatDate(date)]: prev[formatDate(date)] || {
          lunch: false,
          dinner: false,
        }, // Default OFF for lunch and dinner
      }));
    }
  };

  const toggleMealPreference = (mealType) => {
    const dateString = formatDate(value);
    setMealPreferences((prev) => ({
      ...prev,
      [dateString]: {
        ...prev[dateString],
        [mealType]: !prev[dateString]?.[mealType],
      },
    }));
  };

  const savePreferences = async (studentId, dateString, preferences) => {
    if (!studentId) {
      console.error("Student ID is not available. Cannot save preferences.");
      setErrorMessage("Student ID is required. Please log in.");
      return;
    }

    const { lunch, dinner } = preferences;

    const payload = {
      student_id: studentId,
      date: dateString,
      meals: [
        { type: "lunch", status: lunch ? "on" : "off" },
        { type: "dinner", status: dinner ? "on" : "off" },
      ],
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post("http://localhost:8080/api/meals", payload);
      console.log("Preferences saved successfully:", response.data);
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error(
        "Error saving preferences:",
        error.response ? error.response.data : error
      );
      setErrorMessage("Error saving preferences. Please try again.");
    }
  };

  const handleSave = () => {
    const dateString = formatDate(value);
    const preferences = mealPreferences[dateString] || {
      lunch: false,
      dinner: false,
    };

    savePreferences(studentId, dateString, preferences);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Meal Calendar</h1>
      </div>
      <div className="payment">
        <h2 className="instructions-title">
          Turn your Meal preferences ON or OFF
        </h2>
        <p className="calendar-info">
          Don't let your meals catch you by surprise! 😋<br />
          You can only turn meals off at least 1 day in advance. Make sure to
          update your preferences before the deadline!
        </p>
      </div>
      <Calendar
        className="meal-calendar"
        onChange={handleDateChange}
        value={value}
        view="month"
        next2Label={null}
        prev2Label={null}
        prevLabel="<"
        nextLabel=">"
        showNeighboringMonth={false}
      />
      {errorMessage && (
        <div className="meal-error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      {showModal && (
        <div className="dmodal" onClick={closeModal}>
          <div className="dmodal-content" onClick={(e) => e.stopPropagation()}>
            <span className="dclose" onClick={closeModal}>
              &times;
            </span>
            <h3>Meal Preferences for {formatDate(value)}</h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={mealPreferences[formatDate(value)]?.lunch || false}
                  onChange={() => toggleMealPreference("lunch")}
                />
                Lunch
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={mealPreferences[formatDate(value)]?.dinner || false}
                  onChange={() => toggleMealPreference("dinner")}
                />
                Dinner
              </label>
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCalendar;





