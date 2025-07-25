package com.eva_oarisa_orni.springboot_backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminStudentDTO {

    private String hallName;

    private String email;

    private String contactNo;

    private List<StudentDTO> students;  // List of StudentDTOs
}
