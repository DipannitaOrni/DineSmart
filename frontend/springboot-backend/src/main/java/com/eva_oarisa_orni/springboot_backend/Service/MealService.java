package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.DTO.MealDTO;
import com.eva_oarisa_orni.springboot_backend.DTO.MealDiningManagerDTO;
import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.DiningManagerRepository;
import com.eva_oarisa_orni.springboot_backend.repository.MealRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;
    @Autowired
    private DiningManagerRepository diningManagerRepository; // Repository to fetch DiningManager data
    @Autowired
    private StudentRepository studentRepository;

    // Retrieve all meals for a student
    public List<MealDTO> getMealsByStudent(String studentId) {
        List<Meal> meals = mealRepository.findByStudentStudentID(studentId);
        return meals.stream().map(MealDTO::new).collect(Collectors.toList());
    }

    // Retrieve meals for a specific date
    public List<MealDTO> getMealsByDate(String studentId, LocalDate date) {
        List<Meal> meals = mealRepository.findByStudentStudentIDAndDate(studentId, date);
        return meals.stream().map(MealDTO::new).collect(Collectors.toList());
    }

    // Save or update meal preferences
    public List<MealDTO> saveMealPreferences(MealDTO mealDTO) {
        if (mealDTO.getMeals() == null || mealDTO.getMeals().isEmpty()) {
            throw new IllegalArgumentException("Meal types and statuses are required");
        }

        List<Meal> savedMeals = mealDTO.getMeals().stream().map(mealTypeStatus -> {
            String type = mealTypeStatus.getType();
            String status = mealTypeStatus.getStatus();

            // Check if a meal already exists for the given student, date, and type
            List<Meal> existingMeals = mealRepository.findByStudentStudentIDAndDate(mealDTO.getStudentId(), mealDTO.getDate());
            Meal existingMeal = existingMeals.stream()
                    .filter(meal -> meal.getType().equals(type))
                    .findFirst()
                    .orElse(null);

            if (existingMeal != null) {
                // Update existing meal
                existingMeal.setStatus(status);
                existingMeal.setCost("on".equals(status) ? 40.0 : 0.0);
                return mealRepository.save(existingMeal);
            } else {
                // Create a new meal record
                Meal newMeal = MealDTO.toEntity(mealDTO, type, status);
                return mealRepository.save(newMeal);
            }
        }).collect(Collectors.toList());

        return savedMeals.stream().map(MealDTO::new).collect(Collectors.toList());
    }

    // Update meal status
    public MealDTO updateMealStatus(Long M_Id, String status) {
        Meal meal = mealRepository.findById(M_Id)
                .orElseThrow(() -> new RuntimeException("Meal not found with ID: " + M_Id));
        meal.setStatus(status);
        meal.setCost("on".equals(status) ? 40.0 : 0.0);
        Meal updatedMeal = mealRepository.save(meal);
        return new MealDTO(updatedMeal);
    }


    public List<MealDiningManagerDTO> getMealsByHall(String hallName) {
        // Fetch the DiningManager for the hall
        DiningManager manager = diningManagerRepository.findByAdmin_HallName(hallName)
                .orElseThrow(() -> new EntityNotFoundException("Dining Manager not found for hall: " + hallName));

        // Fetch all students for the hall
        List<Students> students = studentRepository.findByAdmin_HallName(hallName);
        if (students.isEmpty()) {
            throw new EntityNotFoundException("No students found for hall: " + hallName);
        }

        // Collect meal details for each student
        List<MealDiningManagerDTO> mealDTOs = new ArrayList<>();
        for (Students student : students) {
            List<Meal> meals = mealRepository.findByStudentStudentID(student.getStudentID());
            Map<LocalDate, List<MealDiningManagerDTO.MealTypeStatus>> groupedMeals = meals.stream()
                    .collect(Collectors.groupingBy(
                            Meal::getDate,
                            Collectors.mapping(
                                    meal -> new MealDiningManagerDTO.MealTypeStatus(meal.getType(), meal.getStatus()),
                                    Collectors.toList()
                            )
                    ));

            groupedMeals.forEach((date, mealDetails) -> {
                mealDTOs.add(new MealDiningManagerDTO(student.getStudentID(), date, mealDetails));
            });
        }

        return mealDTOs;
    }
}
