import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const hallName = localStorage.getItem("hallName");

  useEffect(() => {
    if (hallName) {
      fetchTransactions();
    }
  }, [monthFilter, hallName]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/payments/hall/${encodeURIComponent(hallName)}`,
        {
          params: {
            month: monthFilter || null, // Send the selected month or null
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  

  const handleSearch = async () => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/payments/search/hall/${encodeURIComponent(hallName)}`,
            { params: { studentID: searchKeyword } }
        );
        setTransactions(response.data);
    } catch (error) {
        console.error("Error searching payments:", error);
    }
};

  
  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header-title">Transactions</h1>
      </div>

      <div
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
       <input
  type="text"
  placeholder="Search by Student ID"
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            marginTop: "10px",
            height: "38px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            fontSize: "15px",
            marginRight: "10px",
            width: "360px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2F8C85",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <select
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "38px",
            boxSizing: "border-box",
            marginLeft: "10px",
          }}
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Display "No payment record" message */}
      {transactions.length === 0 && (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            margin: "20px 0",
            textAlign: "center",
          }}
        >
          No payment record found.
        </div>
      )}

      {/* Render table only if there are transactions */}
      {transactions.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2F8C85", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>
                Transaction ID
              </th>
              <th style={{ padding: "12px", textAlign: "left" }}>Student ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Method</th>
            </tr>
          </thead>
          <tbody>
  {transactions.map((transaction) => (
    <tr key={transaction.transactionId}>
      <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        {transaction.transactionId}
      </td>
      <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
  {transaction.studentId}
</td>
<td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
  {`${transaction.firstName || ""} ${
    transaction.middleName || ""
  } ${transaction.lastName || ""}`.trim()}
</td>

      <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        {transaction.date
          ? new Date(transaction.date).toLocaleDateString()
          : "N/A"}
      </td>
      <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        {transaction.amount}
      </td>
      <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        {transaction.paymentMethod}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default Transactions;


