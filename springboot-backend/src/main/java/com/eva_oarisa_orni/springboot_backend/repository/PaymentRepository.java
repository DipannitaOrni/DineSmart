package com.eva_oarisa_orni.springboot_backend.repository;
import com.eva_oarisa_orni.springboot_backend.DTO.PaymentDTO;
import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.model.Payment;
import com.eva_oarisa_orni.springboot_backend.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Retrieves a list of payments made by a specific student
    List<Payment> findByStudent(Students student);

    // Calculates the total cost of meals for a specific student by summing up the cost of all meals associated with their student ID.
    @Query("SELECT SUM(m.cost) FROM Meal m WHERE m.student.studentID = :studentID")
    Double calculateTotalMealCost(@Param("studentID") String studentID);

    // Calculates the total amount paid by a specific student by summing up all their payments.
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.student.studentID = :studentID")
    Double calculateTotalPaid(@Param("studentID") String studentID);

    // Retrieves all payments associated with a specific hall, identified by the hall name.
    @Query("SELECT p FROM Payment p JOIN p.student s JOIN s.admin a WHERE a.hallName = :hallName")
    List<Payment> findPaymentsByHall(@Param("hallName") String hallName);

    // Retrieves all payments for students managed under a specific hall, using a simpler path-based query.
    @Query("SELECT p FROM Payment p WHERE p.student.admin.hallName = :hallName")
    List<Payment> findByHallName(@Param("hallName") String hallName);

    // Retrieves payments for a specific hall and month.
    @Query("SELECT p FROM Payment p WHERE p.student.admin.hallName = :hallName AND FUNCTION('MONTH', p.date) = :month")
    List<Payment> findPaymentsByHallAndMonth(@Param("hallName") String hallName, @Param("month") int month);

    // Retrieves detailed payment information for a specific hall and student ID, mapped to a custom PaymentDTO object.
    @Query("SELECT new com.eva_oarisa_orni.springboot_backend.DTO.PaymentDTO(" +
            "p.transactionId, p.paymentMethod, s.studentID, " +
            "s.firstName, s.middleName, s.lastName, " +
            "p.amount, p.date) " +
            "FROM Payment p JOIN p.student s " +
            "WHERE s.admin.hallName = :hallName AND s.studentID = :studentID")
    List<PaymentDTO> findPaymentsByHallAndStudentID(@Param("hallName") String hallName, @Param("studentID") String studentId);

    // Allows searching by student ID, first/middle/last name, payment method, and/or payment date.
    @Query("SELECT p FROM Payment p WHERE (:search IS NULL OR p.student.studentID LIKE %:search% OR " +
            "p.student.firstName LIKE %:search% OR " +
            "p.student.middleName LIKE %:search% OR " +
            "p.student.lastName LIKE %:search%) AND " +
            "(:method IS NULL OR p.paymentMethod = :method) AND " +
            "(:date IS NULL OR FUNCTION('DATE', p.date) = :date)")
    List<Payment> searchPayments(@Param("search") String search,
                                 @Param("method") String method,
                                 @Param("date") LocalDate date);

}


