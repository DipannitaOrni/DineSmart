package com.eva_oarisa_orni.springboot_backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class MealHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mhId;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false) // Foreign key to Meal
    private Meal meal; //foreihn key

    // Getters and Setters
    public Long getMhId() {
        return mhId;
    }

    public void setMhId(Long mhId) {
        this.mhId = mhId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }
}
