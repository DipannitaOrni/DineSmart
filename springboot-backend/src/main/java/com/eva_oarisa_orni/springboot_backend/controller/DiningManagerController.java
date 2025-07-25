package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.DTO.DiningManagerDTO;
import com.eva_oarisa_orni.springboot_backend.Service.DiningManagerService;
import com.eva_oarisa_orni.springboot_backend.model.DiningManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dining")
public class DiningManagerController {

    @Autowired
    private DiningManagerService diningManagerService;

    @PostMapping("/assign")
    public ResponseEntity<DiningManager> assignDiningManager(@RequestBody Map<String, Object> request) {
        String studentId = (String) request.get("studentId");
        Double budget = (Double) request.get("budget");
        String duration = (String) request.get("duration");

        DiningManager diningManager = diningManagerService.assignDiningManager(studentId, budget, duration);

        return ResponseEntity.ok(diningManager);
    }

    @GetMapping("/is-assigned/{studentId}")
    public ResponseEntity<Boolean> isAssigned(@PathVariable String studentId) {
        boolean isAssigned = diningManagerService.isAssignedAsDiningManager(studentId);
        return ResponseEntity.ok(isAssigned);
    }


    @GetMapping("/details/{hallName}")
    public ResponseEntity<DiningManagerDTO> getDiningManagerDetails(@PathVariable String hallName) {
        try {
            DiningManagerDTO diningManagerDTO = diningManagerService.getDiningManagerDetails(hallName);
            return ResponseEntity.ok(diningManagerDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
