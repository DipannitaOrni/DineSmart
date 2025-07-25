package com.eva_oarisa_orni.springboot_backend.repository;

import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import com.eva_oarisa_orni.springboot_backend.model.Feedback;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    //Retrieves a list of feedback associated with a specific DiningManager.
    List<Feedback> findByDiningAuthority(DiningManager diningManager);

    //Retrieves a list of feedback submitted by a specific student.
    List<Feedback> findByStudent(Students student);
}
