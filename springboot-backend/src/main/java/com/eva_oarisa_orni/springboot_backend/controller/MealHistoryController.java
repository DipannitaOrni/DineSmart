package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.DTO.MealHistoryDTO;
import com.eva_oarisa_orni.springboot_backend.Service.MealHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/mealHistory")
public class MealHistoryController {

    @Autowired
    private MealHistoryService mealHistoryService;

    @GetMapping
    public ResponseEntity<List<MealHistoryDTO>> getAllMealHistories() {
        List<MealHistoryDTO> mealHistories = mealHistoryService.getAllMealHistories();
        return ResponseEntity.ok(mealHistories);
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MealHistoryDTO>> getMealHistoryByStudentId(@PathVariable Long studentId) {
        List<MealHistoryDTO> history = mealHistoryService.getMealHistoryByStudentId(studentId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/status")
    public boolean checkMealStatus(
            @RequestParam String mealType,
            @RequestParam String date,
            @RequestParam String studentId) {
        LocalDate parsedDate = LocalDate.parse(date);
        return mealHistoryService.isMealActiveForStudent(mealType, parsedDate, studentId);
    }
}


