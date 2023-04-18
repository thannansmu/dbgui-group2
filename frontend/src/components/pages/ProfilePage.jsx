import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';
import { YourQuestions } from './YourQuestions';
import { Button } from '../Button';
import '../styles/Button.css'

export const ProfilePage = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>Your Profile</h1>
      <div>
        <br></br>
        <h4>User Information:</h4> <UserInfo />
      </div>
      <div>
        <YourQuestions />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <div className="button-container" style={{ display: 'flex', flexDirection: 'column' }}>
          {button && (
            <Button to="/ask-question" className="page-button" style={buttonStyles}>
            <i>  Ask Question</i>
            </Button>
          )}
          {button && (
            <Button to="/schedule-appt" className="page-button"  style={buttonStyles}>
             <i> Schedule Appointment</i>
            </Button>
          )}
          {button && (
            <Button to="/review-tutor" className="page-button" style={buttonStyles}>
             <i> Review Tutor</i>
            </Button>
          )}
          {button && (
            <Button to="/booked-appt" className="page-button" style={buttonStyles}>
            <i> Your Booked Appointments</i>
            </Button>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ textDecoration: 'underline' }}>Your Questions</h1>
        <h1 style={{ textDecoration: 'underline', marginLeft: '25px' }}>Your Reviews</h1>
      </div>
    </div>
  );
};

const buttonStyles = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  padding: '10px 20px',
  color: '#333',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  display: 'inline-block',
  textAlign: 'center',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '10px'
};