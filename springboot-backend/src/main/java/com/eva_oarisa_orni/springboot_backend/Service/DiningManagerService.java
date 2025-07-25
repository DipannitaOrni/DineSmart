package com.eva_oarisa_orni.springboot_backend.Service;
import com.eva_oarisa_orni.springboot_backend.DTO.DiningManagerDTO;
import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import com.eva_oarisa_orni.springboot_backend.repository.DiningManagerRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DiningManagerService {

    @Autowired
    private DiningManagerRepository diningManagerRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private StudentRepository studentRepository;

    public DiningManager assignDiningManager(String studentId, Double budget, String duration) {
        Students student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getStudentID().startsWith("19")) {
            throw new RuntimeException("Student is not eligible to be assigned as Dining Manager.");
        }

        DiningManager diningManager = new DiningManager();
        diningManager.setStudent(student);
        diningManager.setName(student.getFullName());
        diningManager.setEmail(student.getEmail());
        diningManager.setBudget(budget);
        diningManager.setDuration(duration);

        return diningManagerRepository.save(diningManager);
    }

    public boolean isAssignedAsDiningManager(String studentId) {
        return diningManagerRepository.existsByStudent_StudentID(studentId);
    }

    public DiningManagerDTO getDiningManagerDetails(String hallName) {
        // Fetch Dining Manager by hall name
        DiningManager diningManager = diningManagerRepository.findByAdminHallName(hallName)
                .orElseThrow(() -> new RuntimeException("Dining Manager not found for hall: " + hallName));

        // Populate DTO with dynamic values
        DiningManagerDTO dto = new DiningManagerDTO();
        dto.setStudentID(diningManager.getStudent().getStudentID()); // Assuming @ManyToOne relationship with Student
        dto.setName(diningManager.getStudent().getFullName());      // Assuming `getFullName()` exists in Student
        dto.setEmail(diningManager.getStudent().getEmail());        // Assuming `getEmail()` exists in Student
        dto.setHallName(diningManager.getAdmin().getHallName());    // Assuming `getHallName()` exists in Admin
        dto.setDuration(diningManager.getDuration());               // Fetch duration from DiningManager
        dto.setBudget(diningManager.getBudget());                   // Fetch budget from DiningManager

        return dto;
    }

}


