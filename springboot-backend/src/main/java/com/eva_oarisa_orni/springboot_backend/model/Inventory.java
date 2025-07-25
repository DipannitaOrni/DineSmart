package com.eva_oarisa_orni.springboot_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inId; // Primary Key

    private String itemName;
    private Integer stock;
    private String stockUnit;
    private Integer reorderLevel;

    @ManyToOne
    @JoinColumn(name = "da_id") // Foreign Key referencing Dining Authority
    private DiningManager diningAuthority; //foreign key

    // Getters and Setters
    public Long getInId() {
        return inId;
    }

    public void setInId(Long inId) {
        this.inId = inId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getStockUnit() {
        return stockUnit;
    }

    public void setStockUnit(String stockUnit) {
        this.stockUnit = stockUnit;
    }

    public Integer getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public DiningManager getDiningAuthority() {
        return diningAuthority;
    }

    public void setDiningAuthority(DiningManager diningAuthority) {
        this.diningAuthority = diningAuthority;
    }
}

