package com.eva_oarisa_orni.springboot_backend.model;

import com.eva_oarisa_orni.springboot_backend.DTO.StudentDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
//@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Students {
    @Id
    @Column(unique = true, nullable = false)
    private String studentID;

    private String firstName;
    private String middleName;
    private String lastName;
    private String dob;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hall_name", referencedColumnName = "hall_name", nullable = false)
    @JsonIgnore
    private Admin admin;  // Foreign key reference to the Admin entity


    @Column(name = "dept_name", nullable = false)
    private String departmentName;

    private String email;
    private String contactNo;
    private String password;
    private String residenceType;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "profile_picture")
    @Lob
    private byte[] profilePic;

    public String getFullName() {
        return firstName
                + (middleName != null ? " " + middleName : "")
                + " " + lastName;
    }

    public Students() {
    }
    public static Students fromDTO(StudentDTO studentDTO) {
        Students student = new Students();
        student.setStudentID(studentDTO.getStudentID());
        student.setFirstName(studentDTO.getFirstName());
        student.setMiddleName(studentDTO.getMiddleName());
        student.setLastName(studentDTO.getLastName());
        student.setContactNo(studentDTO.getContactNo());
        student.setDob(studentDTO.getDob());
        student.setDepartmentName(studentDTO.getDepartmentName());
        student.setResidenceType(studentDTO.getResidenceType());
        student.setRoomNumber(studentDTO.getRoomNumber());
        student.setEmail(studentDTO.getEmail());
        return student;
    }
}
