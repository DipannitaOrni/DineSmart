package com.eva_oarisa_orni.springboot_backend.controller;

import com.eva_oarisa_orni.springboot_backend.model.Inventory;
import com.eva_oarisa_orni.springboot_backend.Service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Get all inventory items for a dining manager
    @GetMapping("/{diningManagerId}")
    public ResponseEntity<List<Inventory>> getInventoryByDiningManager(@PathVariable Long diningManagerId) {
        List<Inventory> inventoryList = inventoryService.getInventoryByDiningManager(diningManagerId);
        return ResponseEntity.ok(inventoryList);
    }

    // Add new inventory
    @PostMapping
    public ResponseEntity<Inventory> addInventory(@RequestBody Inventory inventory) {
        Inventory createdInventory = inventoryService.addInventory(inventory);
        return ResponseEntity.ok(createdInventory);
    }

    // Update inventory
    @PutMapping("/{inventoryId}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long inventoryId, @RequestBody Inventory updatedInventory) {
        Inventory inventory = inventoryService.updateInventory(inventoryId, updatedInventory);
        return ResponseEntity.ok(inventory);
    }
}

