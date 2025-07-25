package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.DTO.StudentProfileDTO;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentProfileService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentProfileDTO getProfileByEmail(String email) {
        Students student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));

        // Map Student entity to StudentProfileDTO
        return new StudentProfileDTO(
                Long.parseLong(student.getStudentID()), // Assuming studentID is the unique identifier for student
                student.getFirstName(),
                student.getLastName(),
                student.getDepartmentName(), // Changed from major to departmentName
                student.getDob(),
                //student.getHallName(),// Changed from hall to hallName
                student.getAdmin().getHallName(),
                student.getResidenceType(),
                student.getRoomNumber(),     // Changed from room to roomNumber
                student.getContactNo(),
                student.getEmail(),
                student.getProfilePic()
        );
    }
    @Transactional
    public void saveProfilePic(Students student) {
        studentRepository.save(student);
    }

}
