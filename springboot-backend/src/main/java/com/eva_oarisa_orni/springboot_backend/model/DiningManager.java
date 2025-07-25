package com.eva_oarisa_orni.springboot_backend.model;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
@Table(name = "dining_authority")
public class DiningManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long daId; // Primary Key

    private String name;
    private String email;
    private Double budget;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "hall_name") // Foreign Key referencing Hall
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "student_id") // Foreign Key referencing Student
    private Students student;

    // Getters and Setters
    public Long getDaId() {
        return daId;
    }

    public void setDaId(Long daId) {
        this.daId = daId;
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

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public Students getStudent() {
        return student;
    }

    public void setStudent(Students student) {
        this.student = student;
    }


    @OneToMany(mappedBy = "diningAuthority", cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;

}
