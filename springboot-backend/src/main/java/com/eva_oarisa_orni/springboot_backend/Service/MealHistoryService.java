package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.DTO.MealHistoryDTO;
import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.MealHistory;
import com.eva_oarisa_orni.springboot_backend.repository.MealHistoryRepository;
import com.eva_oarisa_orni.springboot_backend.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MealHistoryService {

    @Autowired
    private MealHistoryRepository mealHistoryRepository;

    @Autowired
    private MealRepository mealRepository;

    /**
     * Get all meal histories.
     */
    public List<MealHistoryDTO> getAllMealHistories() {
        return mealHistoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get meal history by student ID.
     */
    public List<MealHistoryDTO> getMealHistoryByStudentId(Long studentId) {
        List<MealHistory> histories = mealHistoryRepository.findByMeal_Student_Id(studentId);

        return histories.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert MealHistory to MealHistoryDTO.
     */
    public MealHistoryDTO convertToDTO(MealHistory mealHistory) {
        MealHistoryDTO dto = new MealHistoryDTO();
        dto.setId(mealHistory.getMhId());
        dto.setDate(mealHistory.getDate().toString());

        // Map meal details
        List<MealHistoryDTO.MealDTO> mealDTOs = new ArrayList<>();
        Meal meal = mealHistory.getMeal();
        if (meal != null) {
            MealHistoryDTO.MealDTO mealDTO = new MealHistoryDTO.MealDTO();
            mealDTO.setType(meal.getType());
            mealDTO.setStatus(meal.getStatus());
            mealDTOs.add(mealDTO);
        }
        dto.setMeals(mealDTOs);

        return dto;
    }

    /**
     * Scheduled task to add meal history at midnight.
     * This task runs daily at 12:00 AM (midnight) and creates history for all meals.
     */
    @Scheduled(cron = "0 0 0 * * ?") // Runs at 12:00 AM every day
    public void addSelectedMealsToHistory() {
        // Fetch all meals where the status is "on" (or your condition for selection)
        List<Meal> selectedMeals = mealRepository.findByStatusAndDate("on", LocalDate.now());

        selectedMeals.forEach(meal -> {
            MealHistory mealHistory = new MealHistory();
            mealHistory.setMeal(meal);
            mealHistory.setDate(LocalDate.now()); // Add today's date
            mealHistoryRepository.save(mealHistory); // Save to history
        });

        System.out.println("Selected meals added to history at 12:30 AM");
    }

  public boolean isMealActiveForStudent(String mealType, LocalDate date, String studentId) {
      return mealHistoryRepository.existsMealHistoryByTypeDateAndStudent(mealType, date, studentId);
  }
}







