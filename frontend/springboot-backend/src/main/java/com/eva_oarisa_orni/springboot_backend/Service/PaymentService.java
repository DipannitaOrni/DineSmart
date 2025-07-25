package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.DTO.PaymentDTO;
import com.eva_oarisa_orni.springboot_backend.model.Payment;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import com.eva_oarisa_orni.springboot_backend.repository.PaymentRepository;
import com.eva_oarisa_orni.springboot_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Payment> getPaymentHistory(String studentID) {
        Students student = studentRepository.findById(studentID)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + studentID));
        return paymentRepository.findByStudent(student);
    }

    public List<PaymentDTO> getPaymentsByHallAndMonth(String hallName, Integer month) {
        List<Payment> payments = month != null
                ? paymentRepository.findPaymentsByHallAndMonth(hallName, month)
                : paymentRepository.findByHallName(hallName);

        return payments.stream().map(payment -> new PaymentDTO(
                payment.getTransactionId(),
                payment.getPaymentMethod(),
                payment.getStudent().getStudentID(), // Ensure studentId is mapped
                payment.getStudent().getFirstName(),
                payment.getStudent().getMiddleName(),
                payment.getStudent().getLastName(),
                payment.getAmount(),
                payment.getDate()
        )).collect(Collectors.toList());
    }



    public Double getDuesForStudent(String studentID) {
        // Calculate total meal cost for all time
        Double totalMealCost = paymentRepository.calculateTotalMealCost(studentID); // Remove date filter

        // Calculate total payments made for all time
        Double totalPaid = paymentRepository.calculateTotalPaid(studentID);

        // Calculate dues dynamically
        return (totalMealCost != null ? totalMealCost : 0) - (totalPaid != null ? totalPaid : 0);
    }


   // public List<Payment> searchPayments(String search, String method, LocalDate date) {
     //   return paymentRepository.searchPayments(search, method, date);
 //   }

    public Payment makePayment(String transactionID, String paymentMethod, String studentID, Double amount) {
        Students student = studentRepository.findById(studentID)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + studentID));

        Payment payment = new Payment(transactionID, paymentMethod, amount, LocalDate.now(), student);
        return paymentRepository.save(payment);
    }

    // Add this method in PaymentService

    public List<PaymentDTO> getPaymentsByHall(String hallName) {
        List<Payment> payments = paymentRepository.findByHallName(hallName);
        return payments.stream().map(payment -> {
            PaymentDTO dto = new PaymentDTO();
            dto.setTransactionId(payment.getTransactionId());
            dto.setPaymentMethod(payment.getPaymentMethod());
            dto.setStudentId(payment.getStudent().getStudentID());
            dto.setFirstName(payment.getStudent().getFirstName());
            dto.setMiddleName(payment.getStudent().getMiddleName());
            dto.setLastName(payment.getStudent().getLastName());
            dto.setAmount(payment.getAmount());
            dto.setDate(payment.getDate());

            // Convert LocalDate to Date
           // if (payment.getDate() != null) {
              //  dto.setDate(Date.from(payment.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant()));
          //  }
            return dto;
        }).collect(Collectors.toList());
    }
    public List<PaymentDTO> searchPaymentsByStudentIdAndHall(String hallName, String studentId) {
        return paymentRepository.findPaymentsByHallAndStudentID(hallName, studentId);
    }



}
