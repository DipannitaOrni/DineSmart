package com.eva_oarisa_orni.springboot_backend.DTO;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentSignUpDTO {

    // Ensure you have the getter and setter for studentID
    private String studentID;  // Add this if it's missing

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    @NotBlank(message = "First Name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @Pattern(regexp = "\\d{11}", message = "Contact Number must be 11 digits")
    private String contactNo;

    @NotBlank(message = "Date of Birth is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Date of Birth must be in yyyy-MM-dd format")
    private String dob;  // Change to String

    @NotBlank(message = "Hall Name is required")
    private String hallName;

    @NotBlank(message = "Department Name is required")
    private String departmentName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Residence Type is required")
    private String residenceType;

    private String roomNumber;


    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must be at least 8 characters, include a letter, a number, and a special character")
    private String password;


}
