# DineSmart

**DineSmart** is a smart dining management web application designed specifically for the students and administration of Tapashi Rabeya Hall, CUET. It aims to digitize and streamline meal management, account approvals, payments, and communication within hostel dining halls. The system is designed to scale and will be expanded to support other halls across the CUET campus in the near future.

---

## Table of Contents

- [Features](#features)  
- [User Roles](#user-roles)  
- [Technology Stack](#technology-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Future Enhancements](#future-enhancements)  
 
---

## Features

- **Student Signup & Approval**: Students sign up and wait for admin approval before accessing the system.  
- **Admin Dashboard**: Visual charts for user engagement, student record management, dining manager assignment, and payment monitoring.  
- **Dining Manager Panel**: Senior batch students assigned as dining managers can manage inventory, plan meals, track meal status, and respond to feedback.  
- **Meal Selection & Tokens**: Students select meals via a calendar, download QR-coded meal tokens for secure scanning at dining halls.  
- **Payment Management**: Students pay online with payment history tracking; admins monitor transactions.  
- **Feedback System**: Two-way communication where students submit feedback and dining managers respond.  
- **Secure Account Settings**: Students can manage their account settings, including password changes.

---

## User Roles

### 1. Student  
- Signup and wait for approval  
- Select meals in advance via calendar  
- View meal tokens and scan QR codes to receive meals  
- Make payments and view payment history  
- Submit feedback and complaints  
- Manage personal account settings

### 2. Dining Manager  
- Assigned monthly from senior student batch  
- Monitor and manage food inventory levels with reorder alerts  
- Plan daily and feast day meals  
- Track meal participation status  
- Review and respond to student feedback  

### 3. Admin  
- Approve/reject student signups  
- Edit or delete student records  
- Assign dining manager monthly  
- Monitor payment transactions  
- View overall platform analytics and user engagement

---

## Technology Stack

- **Frontend**: React.js, Bootstrap  
- **Backend**: Spring Boot (Java)  
- **Database**: MySQL 
- **Version Control**: Git / GitHub  

---

## Installation

### 1. Clone the repository  
```bash
git clone https://github.com/DipannitaOrni/DineSmart.git
cd dinesmart
```

### 2. Frontend setup
```bash
cd frontend
npm install
npm start
```

### 3. Backend setup
- Import the Spring Boot project into your preferred IDE
- Configure your database connection
- Run the backend server


---

## Usage

1. Students register on the signup page and wait for admin approval.
2. Admin logs in to approve student accounts, assign dining managers, and monitor transactions.
3. Dining managers log in via a special dashboard to manage inventory, meals, and feedback.

[![Demo Video](https://img.shields.io/badge/Watch-Demo-blue?logo=google-drive)](https://drive.google.com/file/d/13TImoZAhGrv8oyOnYnwaiiObzkKQeVlk/view)

---

## Future Enhancements

- Add push notifications for meal deadlines and approvals
- Integrate AI-powered meal preference analytics
- Mobile app version for easier access


---

