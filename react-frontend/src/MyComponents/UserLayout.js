// MyComponents/UserLayout.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Profile from "./Profile";
import Content from "./Content"; // Assuming Content is part of user routes
import Payment from "./Payment";
import Settings from "./Settings";
import FeedBack from "./FeedBack";
import UserHome from "./UserHome";
import MealCalendar from "./MealCalendar";
import History from "./History";
const UserLayout = () => {
  return (
    <div className="dashboard">
      <SideBar isAdmin={false} isDiningManager={false}/>
      <div className="dashboard--content">
        <Routes>
          <Route path="/dashboard" element={<Content />} />
          <Route path="/mealcalender" element={<MealCalendar />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/History" element={<History />} />
        </Routes>
        <Profile />
      </div>
    </div>
  );
};

export default UserLayout;
