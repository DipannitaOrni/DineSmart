package com.eva_oarisa_orni.springboot_backend.DTO;

public class AdminProfileDTO {

    private String hallName;
    private String email;
    private String contact;


    // Constructor
    public AdminProfileDTO(String hallName, String email, String contact) {
        this.hallName = hallName;
        this.email = email;
        this.contact = contact;

    }

    // Getters and Setters
    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }


}
