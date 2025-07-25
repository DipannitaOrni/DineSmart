package com.eva_oarisa_orni.springboot_backend.model;

import com.eva_oarisa_orni.springboot_backend.DTO.StudentSignUpDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @Column(name = "hall_name", nullable = false, unique = true)
    private String hallName; // Primary Key

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email should be valid")
    private String email;

    @Column(name = "contact_no", nullable = false)
    @Pattern(regexp = "^[0-9]{11}$", message = "Contact number must be 11 digits")
    private String contactNo;

    @Column(name = "password", nullable = false)
    private String password; // Will store hashed passwords

    // No-args constructor for Hibernate
    public Admin(String hallName, String email, String contactNo, String password) {
        this.hallName = hallName;
        this.email = email;
        this.contactNo = contactNo;
        this.password = password;
    }

    // One Admin can have many Students
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)  // cascade all operations to students
    private List<Students> students;

}

