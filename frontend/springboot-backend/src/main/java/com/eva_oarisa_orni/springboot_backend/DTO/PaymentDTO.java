package com.eva_oarisa_orni.springboot_backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.Date;

public class PaymentDTO {
    private String transactionId;
    private String paymentMethod;
    private String studentID;
    private String firstName;
    private String middleName;
    private String lastName;
    private Double amount;
    private LocalDate date;

    // Add this constructor
    public PaymentDTO(String transactionId, String paymentMethod, String studentID,
                      String firstName, String middleName, String lastName,
                      Double amount, LocalDate date) {
        this.transactionId = transactionId;
        this.paymentMethod = paymentMethod;
        this.studentID = studentID;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.amount = amount;
        this.date = date;
    }

    public PaymentDTO() {
        // Default constructor for frameworks like Hibernate
    }


    // Getter and Setter for Date
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStudentId() {
        return studentID;
    }

    public void setStudentId(String studentID) {
        this.studentID = studentID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }


    @Override
    public String toString() {
        return "PaymentDTO{" +
                "transactionId='" + transactionId + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", studentID='" + studentID + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", amount=" + amount +
                ", date=" + date +
                '}';
    }
}
