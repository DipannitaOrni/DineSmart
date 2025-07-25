// SummaryCard.js
import React from 'react';


const course = [
  {
    title: "Due This Month",
    value: "1240/-",
    description: "Dues for this month",
    extra: "Pay by month-end to avoid fees!",
    icon: "💰",
  },
  {
    title: "Feedback Response",
    value: "Reviewed",
    description: "Your feedback is appreciated.",
    extra: "Thank you for your input!",
    icon: "📝",
    backgroundColor: "#E4F7D1",
  },
  {
    title: "Meal Count",
    value: "15 Meals",
    description: "Consumed 15 out of 20 meals.",
    extra: "Keep track of your meals.",
    icon: "🥗",
    backgroundColor: "#D7F0ED",
  },
];
const SummaryCard = () => {
  return (
    <div className="card--container">
      {course.map((item, index) => (
        <div 
          className="card" 
          key={index} 
          style={{ backgroundColor: item.backgroundColor || "#dde6ed" }} // Removed fixed size to test CSS
        >
          <div className="card--cover">{item.icon}</div>
          <div className='card-title'>
            <h2>{item.title}</h2>
          </div>
          <p className="card--value">{item.value}</p>
          <p className="card--desc">{item.description}</p>
          <p className="card--extra">{item.extra}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;