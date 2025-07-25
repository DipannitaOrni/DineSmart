package com.eva_oarisa_orni.springboot_backend.repository;

import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiningManagerRepository extends JpaRepository<DiningManager, Long> {
    boolean existsByStudent_StudentID(String studentId);

        //Retrieves an Optional DiningManager entity based on a direct property called "adminHallName".
        Optional<DiningManager> findByAdminHallName(String hallName);

        //Retrieves an Optional DiningManager entity based on the "hallName" property of the related "admin" entity.
        Optional<DiningManager> findByAdmin_HallName(String hallName);


}





