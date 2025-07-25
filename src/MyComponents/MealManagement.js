import React, { useState } from "react";

const MealManagementPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState([
    { id: 2104074, type: "Lunch", status: "On" },
    { id: 2104074, type: "Dinner", status: "Off" },
    { id: 2104114, type: "Lunch", status: "On" },
    { id: 2104114, type: "Dinner", status: "On" },
    { id: 2104125, type: "Lunch", status: "On" },
    { id: 2104125, type: "Dinner", status: "Off" },
    { id: 2104129, type: "Lunch", status: "Off" },
    { id: 2104129, type: "Dinner", status: "On" },
  ]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value)); // Convert input string to Date object
  };

  const handleStatusChange = (id, type, newStatus) => {
    const updatedMeals = meals.map((meal) =>
      meal.id === id && meal.type === type
        ? { ...meal, status: newStatus }
        : meal
    );
    setMeals(updatedMeals);
  };

  // Group meals by ID
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.id]) {
      acc[meal.id] = [];
    }
    acc[meal.id].push(meal);
    return acc;
  }, {});

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Meal Management</h1>
        <div
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <label
            htmlFor="dateInput"
            style={{
              color: "#2F8C85",
              marginRight: "15px",
              fontSize: "16px",
              marginTop: "-19px",
              fontWeight: "bold",
            }}
          >
            SELECT DATE:
          </label>
          <input
            id="dateInput"
            type="date"
            value={selectedDate.toISOString().substring(0, 10)}
            onChange={handleDateChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              marginTop: "-19px",
              width: "250px", // You can adjust this as needed
            }}
          />
        </div>
        
      </div>
      <input
          type="text"
          placeholder="Search by name..."
          style={searchStyle}
        />
      {/* Meal Status Table */}
      <div style={{ marginTop: "20px", width: "100%" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Type</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedMeals).map((id) => {
              const mealsForId = groupedMeals[id];
              return (
                <React.Fragment key={id}>
                  {/* Render ID only once */}
                  <tr>
                    <td rowSpan={mealsForId.length} style={tableCellStyle}>
                      {id}
                    </td>
                    {/* Render the first row (Lunch) */}
                    <td style={tableCellStyle}>{mealsForId[0].type}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        color: getStatusColor(mealsForId[0].status),
                        fontWeight: "bold",
                      }}
                    >
                      {mealsForId[0].status}
                    </td>
                    <td style={tableCellStyle}>
                      <select
                        value={mealsForId[0].status}
                        onChange={(e) =>
                          handleStatusChange(
                            mealsForId[0].id,
                            mealsForId[0].type,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          outline: "none",
                          cursor: "pointer",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          width: "150px", // Ensures equal width for dropdowns
                        }}
                      >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                      </select>
                    </td>
                  </tr>

                  {/* Render the second row (Dinner) */}
                  <tr>
                    <td style={tableCellStyle}>{mealsForId[1].type}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        color: getStatusColor(mealsForId[1].status),
                        fontWeight: "bold",
                      }}
                    >
                      {mealsForId[1].status}
                    </td>
                    <td style={tableCellStyle}>
                      <select
                        value={mealsForId[1].status}
                        onChange={(e) =>
                          handleStatusChange(
                            mealsForId[1].id,
                            mealsForId[1].type,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          outline: "none",
                          cursor: "pointer",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          width: "150px", // Ensures equal width for dropdowns
                        }}
                      >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                      </select>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline Styles
const tableHeaderStyle = {
  padding: "10px",
  backgroundColor: "#2F8C85",
  color: "#fff",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "16px",
};

const tableCellStyle = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
  width: "25%",
};
const searchStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #2F8C85",
  width: "100%",
  marginBottom: "10px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed", // Ensures equal column width
};

const getStatusColor = (status) => {
  switch (status) {
    case "On":
      return "#4CAF50";
    case "Off":
      return "#F44336";
    default:
      return "#333";
  }
};

export default MealManagementPage;
