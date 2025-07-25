package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentLoginService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository; // Add this for admin repository

    public String authenticate(String email, String password) {
        // Check if the user is an admin based on the email and password
        Optional<Admin> admin = adminRepository.findByEmail(email); // Use the injected instance of adminRepository
        if (admin.isPresent()) {
            boolean passwordMatches = BCrypt.checkpw(password, admin.get().getPassword());

            if (passwordMatches) {
                return "Admin Dashboard"; // Return admin dashboard response
            }
        }

        // Otherwise, check the student credentials
        Optional<Students> student = studentRepository.findByEmail(email);

        if (student.isPresent()) {
            // Compare the plain-text password with the hashed password from the database
            boolean passwordMatches = BCrypt.checkpw(password, student.get().getPassword());

            if (passwordMatches) {
                return "Student Dashboard"; // Return student dashboard response
            }
        }

        // Return an error message if authentication fails
        return "Invalid email or password";
    }
}


