package com.eva_oarisa_orni.springboot_backend.DTO;

import java.time.LocalDate;
import java.util.List;

public class MealDiningManagerDTO {

    private String studentID; // ID of the student
    private LocalDate date;   // Date of the meal
    private List<MealTypeStatus> meals; // List of meal types and statuses

    // Constructor
    public MealDiningManagerDTO(String studentId, LocalDate date, List<MealTypeStatus> meals) {
        this.studentID = studentId;
        this.date = date;
        this.meals = meals;
    }

    // Default Constructor
    public MealDiningManagerDTO() {}

    // Getters and Setters
    public String getStudentId() {
        return studentID;
    }

    public void setStudentId(String studentId) {
        this.studentID = studentId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<MealTypeStatus> getMeals() {
        return meals;
    }

    public void setMeals(List<MealTypeStatus> meals) {
        this.meals = meals;
    }

    @Override
    public String toString() {
        return "MealDiningManagerDTO{" +
                "studentId='" + studentID + '\'' +
                ", date=" + date +
                ", meals=" + meals +
                '}';
    }

    // Static Inner Class
    public static class MealTypeStatus {
        private String type;   // Type of meal (e.g., Lunch, Dinner)
        private String status; // Status of meal (e.g., On, Off)

        // Constructor
        public MealTypeStatus(String type, String status) {
            this.type = type;
            this.status = status;
        }

        // Default Constructor
        public MealTypeStatus() {}

        // Getters and Setters
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        @Override
        public String toString() {
            return "MealTypeStatus{" +
                    "type='" + type + '\'' +
                    ", status='" + status + '\'' +
                    '}';
        }
    }
}
