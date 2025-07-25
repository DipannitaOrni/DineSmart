package com.eva_oarisa_orni.springboot_backend.Service;

import com.eva_oarisa_orni.springboot_backend.model.Inventory;
import com.eva_oarisa_orni.springboot_backend.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getInventoryByDiningManager(Long diningManagerId) {
        return inventoryRepository.findByDiningAuthority_DaId(diningManagerId);
    }

    public Inventory addInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long inventoryId, Inventory updatedInventory) {
        Inventory existingInventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
        existingInventory.setItemName(updatedInventory.getItemName());
        existingInventory.setStock(updatedInventory.getStock());
        existingInventory.setStockUnit(updatedInventory.getStockUnit());
        existingInventory.setReorderLevel(updatedInventory.getReorderLevel());
        return inventoryRepository.save(existingInventory);
    }
}

