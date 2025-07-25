import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar"; // Sidebar for Dining Manager
import DiningDashboard from "./DiningDashboard";
import DiningInventory from "./DiningInventory";
import DiningMeals from "./DiningMeals";
import DiningFeedback from "./DiningFeedback";
import MealManagementPage from "./DiningMealManage";
const DiningLayout = () => {
  return (
    <div className="dashboard">
      <SideBar isAdmin={false} isDiningManager={true} /> {/* Assuming Dining Manager isn't an admin */}
      <div className="dashboard--content">
        <Routes>
          <Route path="/dining" element={<DiningDashboard />} />
          <Route path="/dining/inventory" element={<DiningInventory />} />
          <Route path="/dining/meal-status" element={<DiningMeals />} />
          <Route path="/dining/feedback" element={<DiningFeedback />} />
          <Route path="/dining/status" element={<MealManagementPage/>} />
        </Routes>
      </div>
    </div>
  );
};

export default DiningLayout;
