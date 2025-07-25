package com.eva_oarisa_orni.springboot_backend.repository;

import com.eva_oarisa_orni.springboot_backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

    // Find Admin by email
    Optional<Admin> findByEmail(String email);

    // Add method to find Admin by hallName
    Optional<Admin> findByHallName(String hallName);


}

