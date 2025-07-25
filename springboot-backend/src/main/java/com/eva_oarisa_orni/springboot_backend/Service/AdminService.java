package com.eva_oarisa_orni.springboot_backend.Service;
import com.eva_oarisa_orni.springboot_backend.exception.ResourceNotFoundException;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;
import com.eva_oarisa_orni.springboot_backend.DTO.AdminProfileDTO;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminProfileDTO getAdminProfileByEmail(String email) {
        // Query the database to fetch the admin profile by email
        Optional<Admin> adminOptional = adminRepository.findByEmail(email); // Returns Optional<Admin>

        // Check if the admin exists, otherwise throw an exception
        Admin admin = adminOptional.orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email));

        // Return the profile data without the description
        return new AdminProfileDTO(admin.getHallName(), admin.getEmail(), admin.getContactNo());
    }


    public Map<String, Object> authenticate(String email, String password) {
        Optional<Admin> hallAdmin = adminRepository.findByEmail(email);

        if (hallAdmin.isPresent() && BCrypt.checkpw(password, hallAdmin.get().getPassword())) {
            Admin admin = hallAdmin.get();
            Map<String, Object> response = new HashMap<>();
            response.put("hallName", admin.getHallName());
            response.put("email", admin.getEmail());
            response.put("contactInfo", admin.getContactNo());
            response.put("role", "Admin");
            return response;
        }
        throw new RuntimeException("Invalid email or password");
    }


    // Method to fetch the hall name by admin's email
    public String getHallNameByEmail(String email) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + email));
        return admin.getHallName();
    }
    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + email));
    }

}




