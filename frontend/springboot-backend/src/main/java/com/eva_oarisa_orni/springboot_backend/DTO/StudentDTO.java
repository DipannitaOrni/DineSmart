package com.eva_oarisa_orni.springboot_backend.DTO;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Getter
@Setter
public class StudentDTO {

    private String studentID;

    @NotEmpty(message = "First name cannot be empty")
    private String firstName;

    private String middleName;

    @NotEmpty(message = "Last name cannot be empty")
    private String lastName;

    private String contactNo;

    private String dob;



    private String departmentName;

    private String residenceType;

    private String roomNumber;

    @Email(message = "Invalid email format")
    private String email;
}

