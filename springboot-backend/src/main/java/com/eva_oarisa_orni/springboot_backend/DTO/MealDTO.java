package com.eva_oarisa_orni.springboot_backend.DTO;

import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.List;

public class MealDTO {

    @JsonProperty("meals") // Represents multiple meals (type + status)
    private List<MealTypeStatus> meals;

    private String menu;

    @JsonProperty("is_special") // Use consistent naming for JSON fields
    private Boolean isSpecial;

    private LocalDate date;

    @JsonProperty("student_id") // Maps to the JSON field "student_id"
    private String studentId;

    // Nested static class for meal type and status
    public static class MealTypeStatus {
        private String type; // Type of meal (e.g., lunch or dinner)
        private String status; // Status of meal (e.g., on or off)

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

    // Default constructor
    public MealDTO() {
    }

    // Constructor to create MealDTO from Meal entity
    public MealDTO(Meal meal) {
        this.menu = meal.getMenu();
        this.isSpecial = meal.getIsSpecial();
        this.date = meal.getDate();
        this.studentId = meal.getStudent().getStudentID();
    }

    // Convert DTO to Entity
    public static Meal toEntity(MealDTO mealDTO, String type, String status) {
        if (mealDTO.getStudentId() == null || mealDTO.getStudentId().isEmpty()) {
            throw new IllegalArgumentException("Student ID is required");
        }
        if (mealDTO.getDate() == null) {
            throw new IllegalArgumentException("Date is required");
        }

        Meal meal = new Meal();
        meal.setType(type); // Set type from MealTypeStatus
        meal.setMenu(mealDTO.getMenu()); // Allow menu to be null
        meal.setIsSpecial(mealDTO.getIsSpecial() != null ? mealDTO.getIsSpecial() : false);
        meal.setCost("on".equals(status) ? 40.0 : 0.0); // Set cost based on status
        meal.setStatus(status); // Set status from MealTypeStatus
        meal.setDate(mealDTO.getDate());

        Students student = new Students();
        student.setStudentID(mealDTO.getStudentId());
        meal.setStudent(student);

        return meal;
    }


    // Getters and Setters
    public List<MealTypeStatus> getMeals() {
        return meals;
    }

    public void setMeals(List<MealTypeStatus> meals) {
        this.meals = meals;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    public Boolean getIsSpecial() {
        return isSpecial;
    }

    public void setIsSpecial(Boolean isSpecial) {
        this.isSpecial = isSpecial;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "MealDTO{" +
                "meals=" + meals +
                ", menu='" + menu + '\'' +
                ", isSpecial=" + isSpecial +
                ", date=" + date +
                ", studentId='" + studentId + '\'' +
                '}';
    }


    // for dining manager
    public MealDTO(LocalDate date, String type, String status, String studentId) {
        this.date = date;
        this.studentId = studentId;
        // Assuming meals list can be updated with type and status
        MealTypeStatus mealTypeStatus = new MealTypeStatus();
        mealTypeStatus.setType(type);
        mealTypeStatus.setStatus(status);
        this.meals = List.of(mealTypeStatus);
    }

}






