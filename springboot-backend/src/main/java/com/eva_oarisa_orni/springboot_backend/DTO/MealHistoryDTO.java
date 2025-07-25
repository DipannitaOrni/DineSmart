package com.eva_oarisa_orni.springboot_backend.DTO;

import java.util.List;

public class MealHistoryDTO {
    private Long id;
    private String date;
    private List<MealDTO> meals; // List of meals for this history entry

    // Getters and setters

    public static class MealDTO {
        private String type;
        private String status;

        // Getters and setters
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
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<MealDTO> getMeals() {
        return meals;
    }

    public void setMeals(List<MealDTO> meals) {
        this.meals = meals;
    }
}








