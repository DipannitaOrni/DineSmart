import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiMobile, BiCreditCard, BiIdCard } from "react-icons/bi";
import "./Payment.css";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [method, setMethod] = useState("");
  const [payments, setPayments] = useState([]);
  const [dues, setDues] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [studentId, setStudentId] = useState(null);

  // Load studentId from local storage on component mount
  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      setStudentId(storedStudentId);
      fetchPaymentHistory(storedStudentId);
      fetchDues(storedStudentId);
    } else {
      console.error("No student ID found in local storage!");
    }
  }, []);

  const fetchPaymentHistory = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/payments/history/${id}`
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const fetchDues = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/payments/dues/${id}`
      );
      setDues(response.data);
    } catch (error) {
      console.error("Error fetching dues:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      console.error("Student ID is missing!");
      return;
    }

    if (!transactionId || !method || !amount) {
      console.error("All fields are required!");
      return;
    }

    try {
      const newPayment = {
        transactionId,
        paymentMethod: method,
        studentId,
        amount: parseFloat(amount),
      };

      console.log("Submitting payment:", newPayment);

      const response = await axios.post(
        `http://localhost:8080/api/payments/make`,
        newPayment
      );

      setPayments([...payments, response.data]);
      setAmount("");
      setTransactionId("");
      setMethod("");
      setShowSuccessMessage(true);

      // Refresh dues after successful payment
      fetchDues(studentId);

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="content">
      <div
        className="content--header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="header-title">Payment</h1>
        <div
          className="dues-display"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#2F8C85",
          }}
        >
          Dues : <span style={{ color: "#F44336" }}>{dues} BDT</span>
        </div>
      </div>

      <div className="payment">
        <h2 className="instructions-title">
          Follow These Steps to Complete Your Payment
        </h2>

        <div className="instructions-container">
          <div className="instruction-card">
            <BiMobile className="instruction-icon" />
            <p>
              <strong>Step 1:</strong> Complete your payment using -{" "}
              <strong>Bkash/Rocket/Nagad</strong>
            </p>
          </div>
          <div className="instruction-card">
            <BiCreditCard className="instruction-icon" />
            <p>
              <strong>Step 2:</strong> Transfer the payment to :{" "}
              <strong>01329339440</strong>
            </p>
          </div>
          <div className="instruction-card">
            <BiIdCard className="instruction-icon" />
            <p>
              <strong>Step 3:</strong> Enter the Transaction ID in the box below
              after payment
            </p>
          </div>
        </div>

        {showSuccessMessage && (
          <div
            style={{
              margin: "20px 0",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              textAlign: "center",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Payment Successfully Submitted!
          </div>
        )}

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Transaction ID:
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Payment Method:
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
              >
                <option value="">Select Method</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
            </label>
          </div>
          <button className="submit-btn" type="submit">
            Submit Payment
          </button>
        </form>

        <div style={{ marginTop: "60px" }}>
          <h3 style={{ color: "#2f8c85", fontWeight: "800" }}>
            Payment History
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#2F8C85",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "12px 16px" }}>Date</th>
                <th style={{ padding: "12px 16px" }}>Amount (BDT)</th>
                <th style={{ padding: "12px 16px" }}>Transaction ID</th>
                <th style={{ padding: "12px 16px" }}>Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{payment.date}</td>
                  <td style={{ padding: "12px 16px" }}>{payment.amount}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {payment.transactionId}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{payment.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;


