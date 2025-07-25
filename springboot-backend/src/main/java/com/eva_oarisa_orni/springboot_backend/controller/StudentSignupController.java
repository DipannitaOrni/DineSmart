package com.eva_oarisa_orni.springboot_backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;  // Import ResponseEntity
import org.springframework.http.HttpStatus;    // Import HttpStatus

import com.eva_oarisa_orni.springboot_backend.Service.StudentSignUpService;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentSignUpDTO; // Use the DTO here

@RestController
@RequestMapping("/api/students")
public class StudentSignupController {

    @Autowired
    private StudentSignUpService studentService;

    // Add @CrossOrigin to allow requests from specific frontend origin
    @CrossOrigin(origins = "http://localhost:3000")  // React frontend URL
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody StudentSignUpDTO studentSignUpDTO) {  // Use DTO here
        // Call the service layer to handle the business logic and registration
        String result = studentService.registerStudent(studentSignUpDTO);

        if (result.equals("Student registered successfully!")) {
            return ResponseEntity.ok(result); // Success, return 200 OK with message
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result); // Error, return 400 with message
        }
    }
}




