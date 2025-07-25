package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.Service.StudentProfileService;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentProfileDTO;
import com.eva_oarisa_orni.springboot_backend.Service.StudentLoginService;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentLoginDTO;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/students")
public class StudentLoginController {

    @Autowired
    private StudentLoginService studentLoginService;

    @Autowired
    private StudentProfileService studentProfileService; // Inject StudentProfileService

    @Autowired
    private StudentRepository studentRepository;

    // Endpoint for login
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StudentLoginDTO loginRequest,  HttpSession session) {
        String email = loginRequest.getEmail().trim(); // Trim the email to remove any extra spaces/newlines
        String response = studentLoginService.authenticate(email, loginRequest.getPassword());

        if ("Admin Dashboard".equals(response)) {
            return ResponseEntity.ok("Admin Dashboard");
        } else if ("Student Dashboard".equals(response)) {
            session.setAttribute("studentEmail", email);
            return ResponseEntity.ok("Student Dashboard");
        } else {
            return ResponseEntity.status(401).body(response); // Invalid email or password
        }
    }


    // Endpoint to upload profile picture
    // Endpoint to upload profile picture
    @CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
    @PostMapping("/uploadProfilePic")
    public ResponseEntity<String> uploadProfilePic(@RequestParam("profilePic") MultipartFile file,
                                                   @RequestParam("email") String email) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file selected");
            }

            // Convert the file to byte array
            byte[] fileBytes = file.getBytes();

            // Fetch student by email
            Students student = studentRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Update the student with the new profile picture as byte[]
            student.setProfilePic(fileBytes);
            studentRepository.save(student); // Save the updated student to the database

            return ResponseEntity.ok("Profile picture uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading profile picture: " + e.getMessage());
        }
    }

    // Method to save the file to the server
    private String saveFile(MultipartFile file) throws IOException {
        String directory = "uploads"; // Directory where you want to store the file
        Path path = Paths.get(directory);

        if (!Files.exists(path)) {
            Files.createDirectories(path); // Create the directory if it doesn't exist
        }

        // Create a path to save the file
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = path.resolve(fileName);

        // Transfer the file to the target location
        file.transferTo(filePath.toFile());

        return filePath.toString(); // Return the path of the uploaded file
    }
    @CrossOrigin(origins = "http://localhost:3002", allowCredentials = "true")
    @GetMapping("/profilePic")
    public ResponseEntity<byte[]> getProfilePic(@RequestParam String email) {
        try {
            // Fetch student by email
            Students student = studentRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            // Retrieve profile picture as byte array
            byte[] profilePic = student.getProfilePic();
            if (profilePic == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Return the profile picture with the correct content type
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // You can adjust the content type based on image format
                    .body(profilePic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Endpoint to get profile
    @CrossOrigin(origins = "http://localhost:3002", allowCredentials = "true")
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        try {
            StudentProfileDTO studentProfile = studentProfileService.getProfileByEmail(email);

            if (studentProfile == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
            }

            return ResponseEntity.ok(studentProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching the profile: " + e.getMessage());
        }
    }




}

