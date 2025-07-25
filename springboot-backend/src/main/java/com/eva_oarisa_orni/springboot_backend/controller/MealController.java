package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.DTO.MealDiningManagerDTO;
import com.eva_oarisa_orni.springboot_backend.Service.MealService;
import com.eva_oarisa_orni.springboot_backend.DTO.MealDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    private MealService mealService;

    // Get all meals for a student
    @GetMapping("/{studentId}")
    public ResponseEntity<List<MealDTO>> getMealsByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(mealService.getMealsByStudent(studentId));
    }

    // Get meals for a specific date
    @GetMapping("/{studentId}/date")
    public ResponseEntity<List<MealDTO>> getMealsByDate(
            @PathVariable String studentId,
            @RequestParam String date
    ) {
        LocalDate parsedDate = LocalDate.parse(date);
        return ResponseEntity.ok(mealService.getMealsByDate(studentId, parsedDate));
    }

    @PostMapping
    public ResponseEntity<List<MealDTO>> saveMealPreferences(@RequestBody MealDTO mealDTO) {
        try {
            // Log the received payload for debugging
            System.out.println("Received Payload: " + mealDTO);
            System.out.println("Received Student ID: " + mealDTO.getStudentId());
            System.out.println("Received Date: " + mealDTO.getDate());
            System.out.println("Received Meals: " + mealDTO.getMeals());

            // Validate studentId
            if (mealDTO.getStudentId() == null || mealDTO.getStudentId().isEmpty()) {
                throw new IllegalArgumentException("Student ID is required");
            }

            // Call the service to save preferences
            List<MealDTO> savedMeals = mealService.saveMealPreferences(mealDTO);

            // Return the saved meal preferences
            return ResponseEntity.ok(savedMeals);
        } catch (Exception e) {
            // Print the stack trace for debugging unexpected errors
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Update meal status
    @PutMapping("/{mealId}")
    public ResponseEntity<MealDTO> updateMealStatus(
            @PathVariable Long mealId,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(mealService.updateMealStatus(mealId, status));
    }



    // Fetch meals for all students in a hall
    @GetMapping("/hall/{hallName}")
    public ResponseEntity<List<MealDiningManagerDTO>> getMealsByHall(@PathVariable String hallName) {
        List<MealDiningManagerDTO> meals = mealService.getMealsByHall(hallName);
        return ResponseEntity.ok(meals);
    }


}


