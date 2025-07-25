package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.DTO.PaymentDTO;
import com.eva_oarisa_orni.springboot_backend.model.Payment;
import com.eva_oarisa_orni.springboot_backend.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/history/{studentId}")
    public List<Payment> getPaymentHistory(@PathVariable String studentId) {
        return paymentService.getPaymentHistory(studentId);
    }

    @GetMapping("/dues/{studentId}")
    public Double getDuesForStudent(@PathVariable String studentId) {
        return paymentService.getDuesForStudent(studentId);
    }

    @GetMapping("/search/hall/{hallName}")
    public ResponseEntity<List<PaymentDTO>> searchPaymentsByStudentIdAndHall(
            @PathVariable String hallName,
            @RequestParam String studentID) {
        List<PaymentDTO> payments = paymentService.searchPaymentsByStudentIdAndHall(hallName, studentID);
        return ResponseEntity.ok(payments);
    }


    @PostMapping("/make")
    public Payment makePayment(@RequestBody PaymentDTO paymentDTO) {
        System.out.println("Received payment request: " + paymentDTO);
        return paymentService.makePayment(
                paymentDTO.getTransactionId(),
                paymentDTO.getPaymentMethod(),
                paymentDTO.getStudentId(),
                paymentDTO.getAmount()
        );
    }

    @GetMapping("/hall/{hallName}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByHallAndMonth(
            @PathVariable String hallName,
            @RequestParam(required = false) Integer month) {
        List<PaymentDTO> payments = paymentService.getPaymentsByHallAndMonth(hallName, month);
        return ResponseEntity.ok(payments);
    }

}

