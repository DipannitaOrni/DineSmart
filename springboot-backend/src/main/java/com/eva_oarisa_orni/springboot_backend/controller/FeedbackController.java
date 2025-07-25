package com.eva_oarisa_orni.springboot_backend.controller;
import com.eva_oarisa_orni.springboot_backend.DTO.FeedbackDTO;
import com.eva_oarisa_orni.springboot_backend.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Submit feedback
    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        feedbackService.submitFeedback(feedbackDTO);
        return ResponseEntity.ok("Feedback submitted successfully!");
    }

    // Get all feedback for a dining manager's hall
    @GetMapping("/manager/{daId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackForManager(@PathVariable Long daId) {
        return ResponseEntity.ok(feedbackService.getFeedbackForDiningManager(daId));
    }

    // Respond to feedback
    @PostMapping("/respond/{feedbackId}")
    public ResponseEntity<String> respondToFeedback(@PathVariable Long feedbackId, @RequestBody String response) {
        feedbackService.respondToFeedback(feedbackId, response);
        return ResponseEntity.ok("Response submitted successfully!");
    }


    // Delete feedback
    @DeleteMapping("/delete/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.ok("Feedback deleted successfully!");
    }

    // Get feedback responses for a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeedbackDTO>> getResponsesForStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(feedbackService.getResponsesForStudent(studentId));
    }
}

