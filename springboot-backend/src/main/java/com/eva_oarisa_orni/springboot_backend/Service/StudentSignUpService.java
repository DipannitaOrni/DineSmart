package com.eva_oarisa_orni.springboot_backend.Service;
import com.eva_oarisa_orni.springboot_backend.exception.StudentException;  // Import the exception
import com.eva_oarisa_orni.springboot_backend.model.Admin;  // Import Admin class
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;  // Import AdminRepository
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentSignUpDTO;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;

import org.mindrot.jbcrypt.BCrypt;

@Service
public class StudentSignUpService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AdminRepository adminRepository;  // Inject AdminRepository
    public String registerStudent(StudentSignUpDTO studentSignUpDTO) {
        if (studentRepository.existsByStudentID(studentSignUpDTO.getStudentID())) {
            throw new StudentException("Student ID already exists!");
        }

        // Validate residenceType and roomNumber relationship
        if ("alloted".equalsIgnoreCase(studentSignUpDTO.getResidenceType()) &&
                (studentSignUpDTO.getRoomNumber() == null || studentSignUpDTO.getRoomNumber().isBlank())) {
            throw new StudentException("Room Number is required when Residence Type is 'alloted'.");
        }

        if ("attached".equalsIgnoreCase(studentSignUpDTO.getResidenceType()) &&
                studentSignUpDTO.getRoomNumber() != null) {
            throw new StudentException("Room Number must be null when Residence Type is 'attached'.");
        }

        // Retrieve the Admin entity using hallName
        Admin admin = adminRepository.findByHallName(studentSignUpDTO.getHallName())
                .orElseThrow(() -> new StudentException("Hall not found!"));

        Students student = new Students();
        student.setStudentID(studentSignUpDTO.getStudentID());
        student.setFirstName(studentSignUpDTO.getFirstName());
        student.setMiddleName(studentSignUpDTO.getMiddleName());
        student.setLastName(studentSignUpDTO.getLastName());
        student.setDob(studentSignUpDTO.getDob());
        //student.setHallName(studentSignUpDTO.getHallName());
        student.setAdmin(admin);  // Set the admin (hall) for the student
        student.setDepartmentName(studentSignUpDTO.getDepartmentName());
        student.setContactNo(studentSignUpDTO.getContactNo());
        student.setEmail(studentSignUpDTO.getEmail());
        student.setResidenceType(studentSignUpDTO.getResidenceType());
        student.setRoomNumber(studentSignUpDTO.getRoomNumber());

        String hashedPassword = BCrypt.hashpw(studentSignUpDTO.getPassword(), BCrypt.gensalt());
        student.setPassword(hashedPassword);

        studentRepository.save(student);
        return "Student registered successfully!";
    }
}
