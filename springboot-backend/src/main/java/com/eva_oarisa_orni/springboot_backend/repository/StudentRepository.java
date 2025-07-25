package com.eva_oarisa_orni.springboot_backend.repository;

import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Students, String> {

    // Check if a student exists by their studentID (useful for signup validation)
    boolean existsByStudentID(String studentID);

    // For Login validation by email
    Optional<Students> findByEmail(String email);

    // Fetch students associated with a specific admin (hall)
    List<Students> findByAdmin(Admin admin);

    // Fetch a specific student by admin and their specific studentID
    Optional<Students> findByAdminAndStudentID(Admin admin, String studentID);

    // Retrieves all students whose ID starts with '19' and are associated with a specific hall name
    @Query("SELECT s FROM Students s WHERE s.studentID LIKE '19%' AND s.admin.hallName = :hallName")
    List<Students> findAllByIdStartingWith19AndHallName(@Param("hallName") String hallName);

    // Retrieves a specific student record by their unique student ID
    Optional<Students> findByStudentID(String studentID);

    // Retrieves all students associated with a specific hall name
    List<Students> findByAdmin_HallName(String hallName);


}


