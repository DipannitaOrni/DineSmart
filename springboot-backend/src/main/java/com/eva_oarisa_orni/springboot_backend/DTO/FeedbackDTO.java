package com.eva_oarisa_orni.springboot_backend.DTO;
import com.eva_oarisa_orni.springboot_backend.model.Feedback;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long feedbackId;
    private String studentId;
    private String description;
    private LocalDate date;
    private String mealType;
    private int rating;
    private String diningManagerResponse;

    // Constructor to map from the Feedback entity
    public FeedbackDTO(Feedback feedback) {
        this.feedbackId = feedback.getFeedbackId();
        this.studentId = feedback.getStudent().getStudentID();
        this.description = feedback.getDescription();
        this.date = feedback.getDate();
        this.mealType = feedback.getMealType();
        this.rating = feedback.getRating();
        this.diningManagerResponse = feedback.getDiningManagerResponse();
    }
}
