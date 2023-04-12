import React from 'react';
import './CreateAccountForm.css';

export const AvailabilityList = ({ availability, removeAvailability }) => {
    return (
      <div>
        {availability.map((item, index) => (
          <div key={index} className="availability">
            <div className="availableTime">{item}</div>
            <button className="removeButton" onClick={() => removeAvailability(index)}>
              X
            </button>
          </div>
        ))}
      </div>
    );
  };
  
