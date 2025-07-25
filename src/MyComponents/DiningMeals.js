import React, { useState, useEffect } from "react";
import "./DiningMeals.css";

const DiningMeals = () => {
  // List of available dishes
  const [dishes, setDishes] = useState([
    { id: 1, name: "Chicken Curry" },
    { id: 2, name: "Vegetable Stir Fry" },
    { id: 3, name: "Pasta" },
    { id: 4, name: "Salad" },
    { id: 5, name: "Fish Fry" },
    { id: 6, name: "Paneer Butter Masala" },
    { id: 7, name: "Rice" },
    { id: 8, name: "Dal" },
  ]);

  const [newDishName, setNewDishName] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const addNewDish = () => {
    if (newDishName.trim() === "") {
      alert("Dish name cannot be empty.");
      return;
    }

    const dishesArray = newDishName.split(",").map((dish) => dish.trim());

    // Handle empty dish names after splitting
    const validDishes = dishesArray.filter((dish) => dish !== "");

    if (validDishes.length === 0) {
      alert("No valid dish names provided.");
      return;
    }

    // Assuming `dishes` is your state for storing all dishes
    setDishes((prevDishes) => [
      ...prevDishes,
      ...validDishes.map((name, index) => ({
        id: Date.now() + index,
        name,
        isSpecial: false, // Default value
      })),
    ]);

    setNewDishName(""); // Clear the input
    alert(`${validDishes.length} dish(es) added successfully.`);
  };

  const [weeklyPlan, setWeeklyPlan] = useState({
    Monday: { Lunch: [], Dinner: [] },
    Tuesday: { Lunch: [], Dinner: [] },
    Wednesday: { Lunch: [], Dinner: [] },
    Thursday: { Lunch: [], Dinner: [] },
    Friday: { Lunch: [], Dinner: [] },
    Saturday: { Lunch: [], Dinner: [] },
    Sunday: { Lunch: [], Dinner: [] },
  });

  const getWeekDates = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate); // Copy current date
    startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Set to Monday

    const weekDates = {};
    Object.keys(weeklyPlan).forEach((day, index) => {
      const date = new Date(startOfWeek); // Create a fresh Date object for each day
      date.setDate(startOfWeek.getDate() + index); // Add index to get subsequent days
      weekDates[day] = date.toLocaleDateString(); // Format as required
    });

    return weekDates;
  };

  const [weekDates, setWeekDates] = useState(getWeekDates());

  // State for meal assignment
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [selectedDishId, setSelectedDishId] = useState("");

  const addDish = () => {
    const selectedDish = dishes.find(
      (dish) => dish.id === parseInt(selectedDishId)
    );
    if (selectedDish) {
      setWeeklyPlan((prevPlan) => {
        const updatedMeal = [
          ...prevPlan[selectedDay][selectedMeal],
          { ...selectedDish, isSpecial },
        ];
        return {
          ...prevPlan,
          [selectedDay]: {
            ...prevPlan[selectedDay],
            [selectedMeal]: updatedMeal,
          },
        };
      });
    }
  };

  const removeDish = (day, mealType, dishId) => {
    setWeeklyPlan((prevPlan) => {
      const updatedMeal = prevPlan[day][mealType].filter((dish) => dish.id !== dishId);
      return {
        ...prevPlan,
        [day]: {
          ...prevPlan[day],
          [mealType]: updatedMeal,
        },
      };
    });
  };

  const handleSubmit = () => {
    const mealData = {
      day: selectedDay,
      mealType: selectedMeal,
      dishId: selectedDishId,
      isSpecial: isSpecial,
    };

    // Send `mealData` to the backend
  };

  return (
    <div className="content" style={{ marginLeft: "250px" }}>
      <div className="content--header">
        <h1 className="header-title">Meal Planning</h1>
        <p className="header-subtitle">
          Plan lunch and dinner for each day of the week
        </p>
      </div>

      <div className="meal-planning-section poppy-card">
        <h2>Weekly Meal Plan</h2>
        <table className="weekly-plan-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
  {Object.entries(weeklyPlan).map(([day, meals]) => {
    const isFeastLunch = meals.Lunch.some((dish) => dish.isSpecial);
    const isFeastDinner = meals.Dinner.some((dish) => dish.isSpecial);

    return (
      <tr key={day} className={isFeastLunch || isFeastDinner ? "feast-row" : ""}>
        <td>{weekDates[day]}</td>
        <td>
          {meals.Lunch.length > 0 ? (
            <>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // Remove all dishes for Lunch (or implement a different logic if needed)
                  meals.Lunch.forEach((dish) => removeDish(day, "Lunch", dish.id));
                }}
              >
                {meals.Lunch.map((dish) => dish.name).join(", ")}
              </span>
              {isFeastLunch && (
                <span className="feast-badge" style={{ marginLeft: "10px" }}>
                  Feast
                </span>
              )}
            </>
          ) : (
            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>Not Planned</span>
          )}
        </td>
        <td>
          {meals.Dinner.length > 0 ? (
            <>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // Remove all dishes for Dinner (or implement a different logic if needed)
                  meals.Dinner.forEach((dish) => removeDish(day, "Dinner", dish.id));
                }}
              >
                {meals.Dinner.map((dish) => dish.name).join(", ")}
              </span>
              {isFeastDinner && (
                <span className="feast-badge" style={{ marginLeft: "10px" }}>
                  Feast
                </span>
              )}
            </>
          ) : (
            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>Not Planned</span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

      <div className="meal-assignment-section poppy-card">
        <h2>Meal Assignment</h2>
        <div className="assignment-container">
          {/* Meal Assignment Form */}
          <div className="meal-assignment-form">
            <h3>Assign Dish</h3>
            <label htmlFor="date-select">Select Date:</label>
            <select
              id="date-select"
              className="dropdown"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {Object.entries(weekDates).map(([day, date]) => (
                <option key={day} value={day}>
                  {date}
                </option>
              ))}
            </select>
            <label htmlFor="meal-type">Meal Type:</label>
            <select
              id="meal-type"
              value={isSpecial ? "Feast" : "Regular"}
              onChange={(e) => setIsSpecial(e.target.value === "Feast")}
            >
              <option value="Regular">Regular</option>
              <option value="Feast">Feast</option>
            </select>

            <label htmlFor="meal-type-select">Select Meal:</label>
            <select
              id="meal-type-select"
              className="dropdown"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>

            <label htmlFor="dish-select">Select Menu:</label>
            <select
              id="dish-select"
              className="dropdown"
              value={selectedDishId}
              onChange={(e) => setSelectedDishId(e.target.value)}
            >
              <option value="">-- Select Dish--</option>
              {dishes.map((dish) => (
                <option key={dish.id} value={dish.id}>
                  {dish.name}
                </option>
              ))}
            </select>

            <button className="plan-btn small-btn" onClick={addDish}>
              Assign Dish
            </button>
          </div>

          {/* Add New Dish Section */}
          <div className="add-dish-section">
            <h3>Add New Dish</h3>
            <p className="instruction-text">
              Create a new dish to include in your meal plan.
            </p>

            {/* Dish Input */}
            <input
              type="text"
              className="add-dish-input"
              placeholder="Enter dish name"
              value={newDishName}
              onChange={(e) => setNewDishName(e.target.value)}
            />

            {/* Add Dish Button */}
            <button className="plan-btn small-btn" onClick={addNewDish}>
              Add Dish
            </button>

            {/* Recently Added Dishes */}
            <div className="recent-dishes">
              <h4>Recently Added Dishes:</h4>
              {dishes.slice(-4).map((dish) => (
                <p key={dish.id} className="recent-dish-item">
                  {dish.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningMeals;