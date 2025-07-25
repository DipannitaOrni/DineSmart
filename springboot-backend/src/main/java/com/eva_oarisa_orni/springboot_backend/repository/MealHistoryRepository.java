package com.eva_oarisa_orni.springboot_backend.repository;
import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.MealHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealHistoryRepository extends JpaRepository<MealHistory, Long> {

    //Retrieves a list of MealHistory records for a specific student.
    @Query("SELECT mh FROM MealHistory mh WHERE mh.meal.student.id = :studentId")
    List<MealHistory> findByMeal_Student_Id(@Param("studentId") Long studentId);

    //Checks if there is an existing MealHistory record for a specific student, meal type, and date,
    @Query("SELECT COUNT(mh) > 0 FROM MealHistory mh " +
            "WHERE mh.meal.type = :mealType " +
            "AND mh.date = :date " +
            "AND mh.meal.student.studentID = :studentId " +
            "AND mh.meal.status = 'on'")
    boolean existsMealHistoryByTypeDateAndStudent(
            @Param("mealType") String mealType,
            @Param("date") LocalDate date,
            @Param("studentId") String studentId);

}



