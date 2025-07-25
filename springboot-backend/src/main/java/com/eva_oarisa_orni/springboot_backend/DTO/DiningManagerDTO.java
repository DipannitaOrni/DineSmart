package com.eva_oarisa_orni.springboot_backend.DTO;

public class DiningManagerDTO {
    private String studentID;
    private String name;
    private String email;
    private String hallName;
    private double budget; // Updated to double
    private String duration; // String for duration

    // Getters and Setters
    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public double getBudget() { // Budget as double
        return budget;
    }

    public void setBudget(double budget) { // Budget setter
        this.budget = budget;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}

