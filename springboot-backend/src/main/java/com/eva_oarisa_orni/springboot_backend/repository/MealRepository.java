package com.eva_oarisa_orni.springboot_backend.repository;
import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    // Retrieves a list of meals associated with a specific student, identified by their student ID.
    List<Meal> findByStudentStudentID(String studentID);

    // Retrieves a list of meals associated with a specific student and date.
    List<Meal> findByStudentStudentIDAndDate(String studentID, LocalDate date);

    // Retrieves a list of meals available for a specific date.
    List<Meal> findByDate(LocalDate date);

    // Retrieves a list of meals with a specific status (e.g., "on" or "off") and scheduled for a particular date.
    @Query("SELECT m FROM Meal m WHERE m.status = :status AND m.date = :date")
    List<Meal> findByStatusAndDate(@Param("status") String status, @Param("date") LocalDate date);

    // Retrieves a list of meals associated with students who are part of a specific hall, identified by the hall name.
    List<Meal> findByStudent_Admin_HallName(String hallName);

    // Retrieves a specific meal for a student on a given date and meal type (e.g., "Lunch", "Dinner").
    Optional<Meal> findByStudent_StudentIDAndDateAndType(String studentID, LocalDate date, String type);

    // Retrieves a specific meal for a student, identified by student ID, date, and meal type, using a custom JPQL query.
    @Query("SELECT m FROM Meal m WHERE m.student.studentID = :studentId AND m.date = :date AND m.type = :type")
    Optional<Meal> findByStudentAndDateAndType(@Param("studentId") String studentId, @Param("date") LocalDate date, @Param("type") String type);


}
