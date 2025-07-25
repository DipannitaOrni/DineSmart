package com.eva_oarisa_orni.springboot_backend.controller;
import com.eva_oarisa_orni.springboot_backend.DTO.StudentDTO;
import com.eva_oarisa_orni.springboot_backend.DTO.AdminStudentDTO;
import com.eva_oarisa_orni.springboot_backend.Service.AdminService;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.Service.StudentService;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/admin/student")
@CrossOrigin(origins = {"http://localhost:3000", "http://production-url.com"})
public class AdminStudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{email}")
    public ResponseEntity<AdminStudentDTO> getAdminWithStudents(@PathVariable String email) {
        AdminStudentDTO adminDTO = studentService.getAdminWithStudentsDTO(email);
        if (adminDTO != null) {
            return ResponseEntity.ok(adminDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if admin not found
        }
    }
    @GetMapping("/student/{studentID}")
    public ResponseEntity<Students> searchStudent(@PathVariable String studentID) {
        Students student = studentService.searchStudentByStudentID(studentID);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if student not found
        }
    }


    @PutMapping("/student/{studentID}")
    public ResponseEntity<Students> updateStudentInfo(@PathVariable String studentID,
                                                      @RequestBody StudentDTO studentDTO) {
        try {
            Students updatedStudent = studentService.updateStudentInfo(studentID, studentDTO);
            return ResponseEntity.ok(updatedStudent);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if student not found
        }
    }

    @DeleteMapping("/student/{studentID}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentID) {
        try {
            studentService.deleteStudent(studentID);
            return ResponseEntity.noContent().build(); // Return 204 if deleted successfully
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if student not found
        }
    }


}



