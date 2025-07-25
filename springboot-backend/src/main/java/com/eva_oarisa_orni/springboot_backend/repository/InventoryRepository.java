package com.eva_oarisa_orni.springboot_backend.repository;

import com.eva_oarisa_orni.springboot_backend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    //Nested property resolution to access the DiningManager's ID (daId) through the DiningAuthority relationship.
    List<Inventory> findByDiningAuthority_DaId(Long diningManagerId);
}

