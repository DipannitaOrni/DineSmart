import React, { useState, useEffect } from "react";

const MealManagementPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [searchId, setSearchId] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const hallName = localStorage.getItem("hallName");
            const response = await fetch(`http://localhost:8080/api/meals/hall/${hallName}`);
            const data = await response.json();

            // Flatten the response
            const flattenedMeals = data.flatMap((entry) =>
                entry.meals.map((meal) => ({
                    id: entry.studentId,
                    date: entry.date,
                    type: meal.type,
                    status: meal.status,
                }))
            );
            setMeals(flattenedMeals);
        };

        fetchMeals();
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
    };

    const filteredMeals = meals.filter((meal) => {
        const matchesDate = selectedDate ? meal.date === selectedDate : true;
        const matchesId = searchId ? meal.id.toString().includes(searchId) : true;
        const matchesStatus =
            statusFilter === "All" || meal.status === statusFilter;
        return matchesDate && matchesId && matchesStatus;
    });

    const sortedMeals = [...filteredMeals].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

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
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            marginTop: "-19px",
                            width: "250px",
                        }}
                    />
                </div>
            </div>
            <div
                style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
            >
                <input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchId}
                    onChange={handleSearchChange}
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #2F8C85",
                        width: "800px",
                        marginRight: "10px",
                        height: "38px",
                        marginTop: "10px",
                        boxSizing: "border-box",
                    }}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                        height: "38px",
                        boxSizing: "border-box",
                        width: "70px",
                    }}
                >
                    <option value="All">All</option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div style={{ marginTop: "20px", width: "100%" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Date</th>
                            <th style={tableHeaderStyle}>Type</th>
                            <th style={tableHeaderStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMeals.map((meal, index) => (
                            <tr key={`${meal.id}-${meal.date}-${meal.type}`}>
                                <td style={tableCellStyle}>{meal.id}</td>
                                <td style={tableCellStyle}>{meal.date}</td>
                                <td style={tableCellStyle}>{meal.type}</td>
                                <td
                                    style={{
                                        ...tableCellStyle,
                                        color: getStatusColor(meal.status),
                                        fontWeight: "bold",
                                    }}
                                >
                                    {meal.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

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
};

const getStatusColor = (status) => {
    switch (status) {
        case "on":
            return "#4CAF50";
        case "off":
            return "#F44336";
        default:
            return "#333";
    }
};

export default MealManagementPage;
