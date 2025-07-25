package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.Service.StudentService;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentsService;

    @GetMapping("/starting-with-19/{hallName}")
    public ResponseEntity<List<Students>> getStudentsStartingWith19AndHall(@PathVariable String hallName) {
        List<Students> students = studentsService.getStudentsStartingWith19AndHall(hallName);
        return ResponseEntity.ok(students);
    }


}