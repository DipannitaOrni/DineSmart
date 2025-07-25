package com.eva_oarisa_orni.springboot_backend.Service;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentDTO;
import com.eva_oarisa_orni.springboot_backend.DTO.AdminStudentDTO;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Meal;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import com.eva_oarisa_orni.springboot_backend.repository.MealRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private MealRepository mealRepository;

    //Fetch admin by email and its associated students
    public AdminStudentDTO getAdminWithStudentsDTO(String email) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();

            // Create Admin DTO
            AdminStudentDTO adminDTO = new AdminStudentDTO();
            adminDTO.setHallName(admin.getHallName());
            adminDTO.setEmail(admin.getEmail());
            adminDTO.setContactNo(admin.getContactNo());

            // Map the students to StudentDTO
            List<StudentDTO> studentDTOs = admin.getStudents()
                    .stream()
                    .map(student -> {
                        StudentDTO studentDTO = new StudentDTO();
                        studentDTO.setStudentID(student.getStudentID());
                        studentDTO.setFirstName(student.getFirstName());
                        studentDTO.setMiddleName(student.getMiddleName());
                        studentDTO.setLastName(student.getLastName());
                        studentDTO.setContactNo(student.getContactNo());
                        studentDTO.setDob(student.getDob());
                        studentDTO.setDepartmentName(student.getDepartmentName());
                        studentDTO.setResidenceType(student.getResidenceType());
                        studentDTO.setRoomNumber(student.getRoomNumber());
                        studentDTO.setEmail(student.getEmail());
                        return studentDTO;
                    })
                    .collect(Collectors.toList());

            adminDTO.setStudents(studentDTOs);

            return adminDTO;
        }
        return null; // Admin not found
    }

    // Method to search for a student by their studentID
    public Students searchStudentByStudentID(String studentID) {
        return studentRepository.findById(studentID).orElse(null); // Returns null if student not found
    }


    // Method to update student info
    public Students updateStudentInfo(String studentID, StudentDTO studentDTO) {
        // Find the student by studentID
        Students existingStudent = studentRepository.findById(studentID).orElse(null);

        if (existingStudent != null) {
            // Update the student details with values from the DTO
            existingStudent.setFirstName(studentDTO.getFirstName());
            existingStudent.setMiddleName(studentDTO.getMiddleName());
            existingStudent.setLastName(studentDTO.getLastName());
            existingStudent.setContactNo(studentDTO.getContactNo());
            existingStudent.setDob(studentDTO.getDob());
            existingStudent.setDepartmentName(studentDTO.getDepartmentName());
            existingStudent.setResidenceType(studentDTO.getResidenceType());
            existingStudent.setRoomNumber(studentDTO.getRoomNumber());
            existingStudent.setEmail(studentDTO.getEmail());

            // Save the updated student object
            return studentRepository.save(existingStudent);
        }

        throw new IllegalArgumentException("Student not found"); // Throw an exception if student not found
    }


    // Method to delete a student by studentID
    public void deleteStudent(String studentID) {
        // Check if student exists before deleting
        if (studentRepository.existsById(studentID)) {
            studentRepository.deleteById(studentID);
        } else {
            throw new IllegalArgumentException("Student not found");
        }
    }
    public List<Students> getStudentsStartingWith19AndHall(String hallName) {
        return studentRepository.findAllByIdStartingWith19AndHallName(hallName);
    }


    public void updateMealPlan(String studentID, LocalDate date, String type, String menu, Boolean isSpecial) {
        // Find the existing meal
        Meal meal = mealRepository.findByStudent_StudentIDAndDateAndType(studentID, date, type)
                .orElseThrow(() -> new EntityNotFoundException("Meal not found for the given criteria"));

        // Update meal fields
        meal.setMenu(menu);
        meal.setIsSpecial(isSpecial);

        // Save the updated meal
        mealRepository.save(meal);
    }

}



