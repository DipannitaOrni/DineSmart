import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DiningInventory.css";

const DiningInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of hall names to dining manager IDs
  const hallToDiningManagerMap = {
    "Shamshen Nahar Khan Hall": 2,
    "Tapashi Rabeya Hall": 1,
    "Bangabandhu Hall": 3,
    "Dr. Qudrat-E-Huda Hall": 4,
    "Shahid Mohammad Shah Hall": 5,
    "Shahid Tareq Huda Hall": 6,
    "Sheikh Russel Hall": 7,
    "Sufia Kamal Hall": 8
};


  // Determine dining manager ID based on hall name in localStorage
  const hallName = localStorage.getItem("hallName");
  const diningManagerId = hallToDiningManagerMap[hallName];

  // Function to determine stock status based on reorder level
  const getStockStatus = (stock, reorderLevel) => {
    const numericStock = Number(stock); // Ensure stock is a number
  const numericReorderLevel = Number(reorderLevel); // Ensure reorderLevel is a number

  if (numericStock < numericReorderLevel) return "Low";
  const moderateThreshold = numericReorderLevel * 1.35; // 35% above reorder level
  if (numericStock < moderateThreshold) return "Moderate";
  return "Sufficient";
  };

  // Function to get CSS class for stock status
  const getStatusClass = (stock, reorderLevel) => {
    const status = getStockStatus(stock, reorderLevel);
    switch (status) {
      case "Low":
        return "low-stock";
      case "Moderate":
        return "moderate-stock";
      case "Sufficient":
        return "sufficient-stock";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      if (!diningManagerId) {
        setError("Invalid hall name. Dining Manager ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/inventory/${diningManagerId}`
        );
        setInventory(response.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to fetch inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [diningManagerId]);

  const addInventoryItem = async (name, stock, reorderLevel, stockUnit) => {
    if (!diningManagerId) {
      alert("Invalid hall name. Cannot add inventory.");
      return;
    }

    const newItem = {
      itemName: name,
      stock,
      reorderLevel,
      stockUnit,
      diningAuthority: { daId: diningManagerId },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/inventory",
        newItem
      );
      setInventory([...inventory, response.data]);
    } catch (err) {
      console.error("Error adding inventory:", err);
      alert("Failed to add inventory item.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="content">
      {/* Header */}
      <div className="content--header">
        <h1 className="header-title">Dining Inventory</h1>
        <p className="header-subtitle">
          Keep track of your stock efficiently and effortlessly!
        </p>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table poppy-card">
        <h2>Current Inventory</h2>
        <table className="inventory-table-container">
          <thead className="inventory-table-header">
            <tr>
              <th>Item Name</th>
              <th>Stock Remaining</th>
              <th>Stock Unit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr className="inventory-table-row" key={item.inId}>
                <td className="inventory-table-data">{item.itemName}</td>
                <td className="inventory-table-data">{item.stock}</td>
                <td className="inventory-table-data">{item.stockUnit}</td>
                <td
                  className={`inventory-table-data ${getStatusClass(
                    Number(item.stock),
                    Number(item.reorderLevel)
                  )}`}
                >
                  {getStockStatus(Number(item.stock), Number(item.reorderLevel))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Inventory Section */}
      <div className="add-inventory poppy-card">
        <h2>Add/Update Inventory</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { name, stock, reorderLevel, stockUnit } = e.target.elements;
            addInventoryItem(
              name.value,
              parseInt(stock.value),
              parseInt(reorderLevel.value),
              stockUnit.value
            );
            e.target.reset();
          }}
        >
          <div className="form-group">
            <label>Item Name:</label>
            <input type="text" name="name" placeholder="E.g. Sugar" required />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              placeholder="E.g. 25"
              required
            />
          </div>
          <div className="form-group">
            <label>Reorder Level:</label>
            <input
              type="number"
              name="reorderLevel"
              placeholder="E.g. 10"
              required
            />
          </div>
          <div className="form-group">
            <label>Stock Unit:</label>
            <input
              type="text"
              name="stockUnit"
              placeholder="E.g. kg, liters"
              required
            />
          </div>
          <button type="submit" className="add-btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiningInventory;


