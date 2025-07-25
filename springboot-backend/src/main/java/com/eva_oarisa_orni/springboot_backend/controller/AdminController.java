package com.eva_oarisa_orni.springboot_backend.controller;
import com.eva_oarisa_orni.springboot_backend.Service.StudentService;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.eva_oarisa_orni.springboot_backend.DTO.AdminProfileDTO;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentDTO;
import org.springframework.http.HttpStatus;

import java.util.Map;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend running on localhost:3000
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private StudentService studentService;

    /**
     * Fetches the admin profile based on the email in the Authorization header.
     */
    @GetMapping("/profile")
    public ResponseEntity<AdminProfileDTO> getAdminProfile(@RequestHeader("Authorization") String email) {
        try {
            AdminProfileDTO profile = adminService.getAdminProfileByEmail(email);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            // Log the exception (you can log more details in production)
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/getHallName")
    public ResponseEntity<?> getHallName(@RequestParam String email) {
        try {
            Admin admin = adminService.findByEmail(email); // Now properly handles Optional
            return ResponseEntity.ok(Map.of("hallName", admin.getHallName()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}

