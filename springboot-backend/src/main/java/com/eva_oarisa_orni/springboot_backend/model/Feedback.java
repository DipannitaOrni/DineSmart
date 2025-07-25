package com.eva_oarisa_orni.springboot_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id", nullable = false, unique = true)
    private Long feedbackId;

    @NotNull(message = "Description cannot be null")
    @Size(min = 5, message = "Description must be at least 5 characters long")
    @Column(nullable = false, length = 1000)
    private String description;

    @NotNull(message = "Date cannot be null")
    @Column(nullable = false)
    private LocalDate date;

    @NotNull(message = "Meal type cannot be null")
    @Column(nullable = false)
    private String mealType;

    @NotNull(message = "Rating cannot be null")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot exceed 5")
    @Column(nullable = false)
    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentid", referencedColumnName = "studentid", nullable = false)
    @JsonIgnore
    private Students student; //foreign key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "da_id", referencedColumnName = "daId", nullable = false)
    private DiningManager diningAuthority;  //foreign key

    @Column(name = "dining_manager_response", length = 1000)
    private String diningManagerResponse;

    // Method for dining manager to respond to feedback
    public void setDiningManagerResponse(String response) {
        this.diningManagerResponse = response;
    }

    // Method to delete feedback
    public void deleteFeedback() {
        this.description = null;
        this.rating = 0;
        this.mealType = null;
        this.diningManagerResponse = null;
    }
}
