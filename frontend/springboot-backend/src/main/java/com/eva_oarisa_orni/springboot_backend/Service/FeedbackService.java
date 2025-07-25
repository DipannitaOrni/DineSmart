package com.eva_oarisa_orni.springboot_backend.Service;
import com.eva_oarisa_orni.springboot_backend.DTO.FeedbackDTO;
import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import com.eva_oarisa_orni.springboot_backend.model.Feedback;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.DiningManagerRepository;
import com.eva_oarisa_orni.springboot_backend.repository.FeedbackRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private DiningManagerRepository diningManagerRepository;

    @Autowired
    private StudentRepository studentsRepository;

    // Submit feedback
    public void submitFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();

        // Get student
        Students student = studentsRepository.findById(feedbackDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Get the hall name from the student's associated admin
        String studentHallName = student.getAdmin().getHallName();

        // Get dining manager associated with the hall
        DiningManager diningManager = diningManagerRepository.findByAdminHallName(studentHallName)
                .orElseThrow(() -> new RuntimeException("Dining manager not found for the hall: " + studentHallName));

        feedback.setDescription(feedbackDTO.getDescription());
        feedback.setDate(feedbackDTO.getDate());
        feedback.setMealType(feedbackDTO.getMealType());
        feedback.setRating(feedbackDTO.getRating());
        feedback.setStudent(student);
        feedback.setDiningAuthority(diningManager);

        feedbackRepository.save(feedback);
    }

    // Get all feedback for a dining manager's hall
    public List<FeedbackDTO> getFeedbackForDiningManager(Long daId) {
        DiningManager manager = diningManagerRepository.findById(daId)
                .orElseThrow(() -> new RuntimeException("Dining manager not found"));

        return feedbackRepository.findByDiningAuthority(manager)
                .stream()
                .map(FeedbackDTO::new)
                .collect(Collectors.toList());
    }

    // Respond to feedback
    public void respondToFeedback(Long feedbackId, String response) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setDiningManagerResponse(response);
        feedbackRepository.save(feedback);
    }

    // Delete feedback
    public void deleteFeedback(Long feedbackId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedbackRepository.delete(feedback);
    }

    // Get all feedback responses for a student
    public List<FeedbackDTO> getResponsesForStudent(String studentId) {
        Students student = studentsRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return feedbackRepository.findByStudent(student)
                .stream()
                .map(FeedbackDTO::new)
                .collect(Collectors.toList());
    }
}
