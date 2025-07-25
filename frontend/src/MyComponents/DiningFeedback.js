import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiningFeedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Track selected feedback
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [responseText, setResponseText] = useState(''); // Store the response text
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility state
  const [diningManagerId, setDiningManagerId] = useState(null); // Store dining manager ID

  // Fetch the dining manager ID based on hallName from localStorage
  useEffect(() => {
    const hallName = localStorage.getItem('hallName'); // Get the hall name from localStorage

    if (hallName === 'Shamshen Nahar Khan Hall') {
        setDiningManagerId(2); // Set dining manager ID for this hall
    } else if (hallName === 'Tapashi Rabeya Hall') {
        setDiningManagerId(1); // Set dining manager ID for this hall
    } else if (hallName === 'Bangabandhu Hall') {
        setDiningManagerId(3); // Set dining manager ID for this hall
    } else if (hallName === 'Dr. Qudrat-E-Huda Hall') {
        setDiningManagerId(4); // Set dining manager ID for this hall
    } else if (hallName === 'Shahid Mohammad Shah Hall') {
        setDiningManagerId(5); // Set dining manager ID for this hall
    } else if (hallName === 'Shahid Tareq Huda Hall') {
        setDiningManagerId(6); // Set dining manager ID for this hall
    } else if (hallName === 'Sheikh Russel Hall') {
        setDiningManagerId(7); // Set dining manager ID for this hall
    } else if (hallName === 'Sufia Kamal Hall') {
        setDiningManagerId(8); // Set dining manager ID for this hall
    } else {
        alert('Invalid hall name. Please check localStorage.');
    }
}, []);


  // Fetch feedback data from the backend
  useEffect(() => {
    if (diningManagerId) {
      fetchFeedback();
    }
  }, [diningManagerId]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/feedback/manager/${diningManagerId}`
      );
      setFilteredFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      alert('Failed to fetch feedback. Please try again.');
    }
  };

  // Filter feedback by student ID
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = filteredFeedback.filter((feedback) =>
      feedback.studentId.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredFeedback(filtered);
  };

  // Handle selecting or unselecting a feedback to show/hide floating tab
  const handleRowClick = (feedback) => {
    setSelectedFeedback(selectedFeedback === feedback ? null : feedback);
  };

  // Toggle the modal for providing a response
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setShowTooltip(false); // Hide tooltip when opening/closing modal
  };

  const handleResponseChange = (e) => {
    setResponseText(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
    fetchFeedback(); // Reset to the original data
  };

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      setShowTooltip(true); // Show tooltip if response is empty
      return;
    }

    try {
      const payload = {
        response: responseText,
      };
      await axios.post(
        `http://localhost:8080/api/feedback/respond/${selectedFeedback.feedbackId}`,
        responseText, // Send plain text
        { headers: { "Content-Type": "text/plain" } } // Set content type as plain text
      );
      
      alert('Response submitted successfully!');
      setIsModalOpen(false); // Close modal after submission
      setResponseText(''); // Clear response text
      setSelectedFeedback(null); // Clear selection after submitting
      fetchFeedback(); // Refresh feedback list
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit response. Please try again.');
    }
  };

  // Function to render rating stars (golden color)
  const renderRatingStars = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return <span style={{ color: '#FFD700' }}>{stars}</span>;
  };

  return (
    <div className='content'>
      <div className="content--header">
        <h1 className='header-title'>Student Feedback</h1>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.searchFilterSection}>
        <input
          type="text"
          placeholder="Search by Student ID"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <button style={styles.resetButton} onClick={handleReset}>Reset Filters</button>
      </div>

      {/* Feedback Table */}
      <div style={styles.tableContainer}>
        {filteredFeedback.length === 0 ? (
          <p style={styles.noRecords}>No records found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Student ID</th>
                
                <th style={styles.tableHeader}>Meal Type</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Rating</th>
                <th style={styles.tableHeader}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.map((feedback, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(feedback)}
                  style={selectedFeedback === feedback ? styles.selectedRow : {}}
                >
                  <td style={styles.tableCell}>{feedback.studentId}</td>
                 
                  <td style={styles.tableCell}>{feedback.mealType}</td>
                  <td style={styles.tableCell}>{new Date(feedback.date).toLocaleDateString()}</td>
                  <td style={styles.tableCell}>{renderRatingStars(feedback.rating)}</td>
                  <td style={styles.feedbackCell}>{feedback.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Response Tab */}
      {selectedFeedback && (
        <div
          style={styles.responseTab}
          onClick={toggleModal}
        >
          Respond
        </div>
      )}

      {/* Modal for Response */}
      {isModalOpen && (
        <div className='fmodal-overlay'>
          <div className='fmodal-content'>
            <div style={{
              fontSize: '1.4rem',
              color: '#2f8c85',
              textAlign: 'center',
              marginBottom: '30px',
              marginTop: '25px'
            }}>
              <h3>Respond to {selectedFeedback.studentName}</h3>
            </div>

            <textarea
              style={styles.feedbackTextarea}
              value={responseText}
              onChange={handleResponseChange}
              placeholder="Write your response here..."
            ></textarea>
            <div style={styles.modalActions}>
              <button style={styles.modalButton} onClick={handleSubmitResponse}>Submit Response</button>
              <button style={styles.modalButton} onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



// Add `styles` object for consistent styling

// Styles for the Feedback Page
const styles = {
  searchFilterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px 15px',
    fontSize: '14px',
    width: '85%',
    borderRadius: '12px',
    border: '1px solid #2f8c85',
  },
  resetButton: {
    width: '130px',
    height: '35px',
    marginTop: '6px',
    backgroundColor: '#2f8c85',
    color: '#fff',
    border: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  tableContainer: {
    overflowX: 'auto',
    
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    tableLayout: 'auto',
    
   
  },
  tableHeader: {
    backgroundColor: '#2f8c85',
    color: '#fff',
    padding: '12px 20px',
    
    textAlign: 'left',
    fontWeight: 'bold',
    whiteSpace:'nowrap',
  },
  tableCell: {
    padding:'2px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
    wordWrap: 'break-word',
    width: '120px',
  },
  feedbackCell: {
    padding: '8px 10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    fontSize:'14px',
    wordWrap: 'break-word',
    maxWidth: '500px',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },
  noRecords: {
    textAlign: 'center',
    color: '#999',
    fontSize: '16px',
  },
  selectedRow: {
    backgroundColor: '#e0f7fa', // Highlight selected row
  },
  responseTab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#2f8c85',
    color: '#fff',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '10',
  },

 
  feedbackTextarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    fontSize: '14px',
    resize: 'none',
  },
  modalActions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: '8px 16px',
    backgroundColor: '#2f8c85',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
  },
};

export default DiningFeedback;
