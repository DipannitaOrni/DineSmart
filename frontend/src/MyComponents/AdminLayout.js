// MyComponents/AdminLayout.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import AdminDashboard from "./AdminDashboard"; // Admin-specific dashboard component
import StudentManage from "./StudentManage";
import MealManagement from "./MealManagement";
import AdminDining from "./AdminDining";
import AdminFeedback from './AdminFeedback';
import Transactions from "./Transactions";
const AdminLayout = () => {
  return (
    <div className="dashboard">
      <SideBar isAdmin={true} />
      <div className="dashboard--content">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element = {<StudentManage/>} />
          <Route path="/admin/students/meals" element = {<MealManagement/>} />
          <Route path="/admin/dining-manager" element = {<AdminDining/>} />
          //<Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/admin/transactions" element = {<Transactions/>} />
        </Routes>
       
      </div>
    </div>
  );
};

export default AdminLayout;
