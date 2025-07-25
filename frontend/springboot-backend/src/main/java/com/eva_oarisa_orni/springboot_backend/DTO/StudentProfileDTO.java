package com.eva_oarisa_orni.springboot_backend.DTO;

public class StudentProfileDTO {
    private Long studentID;
    private String firstName;
    private String lastName;
    private String departmentName;  // Changed from major to departmentName
    private String dob;
    private String hallName;        // Changed from hall to hallName
    private String residenceType;
    private String roomNumber;      // Changed from room to roomNumber
    private String contactNo;
    private String email;
    private byte[] profilePic;
    // Constructor
    public StudentProfileDTO(Long studentID, String firstName, String lastName, String departmentName, String dob,
                             String hallName, String residenceType, String roomNumber, String contactNo, String email,byte[] profilePic) {
        this.studentID= studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentName = departmentName;
        this.dob = dob;
        this.hallName = hallName;
        this.residenceType = residenceType;
        this.roomNumber = roomNumber;
        this.contactNo = contactNo;
        this.email = email;
        this.profilePic = profilePic;
    }

    // Getters and Setters
    public Long getId() {
        return studentID;
    }

    public void setId(Long id) {
        this.studentID= id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getResidenceType() {
        return residenceType;
    }

    public void setResidenceType(String residenceType) {
        this.residenceType = residenceType;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    // Getter and Setter methods for all fields
    public byte[] getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(byte[] profilePic) {
        this.profilePic = profilePic;
    }

}
