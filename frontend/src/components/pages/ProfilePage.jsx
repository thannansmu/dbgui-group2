import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';
import { YourQuestions } from './YourQuestions';
import { Button } from '../Button';
import '../styles/Button.css';
import { getUserByAttribute } from '../../Api/userApi';

export const ProfilePage = ({ loggedInUser }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [bio, setBio] = useState('');



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
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const response = await getUserByAttribute(loggedInUser, 'firstName');
    setFirstName(response[0].firstName);
    const lastResponse = await getUserByAttribute(loggedInUser, 'lastName');
    setLastName(lastResponse[0].lastName);
    const roleResponse = await getUserByAttribute(loggedInUser, 'userRole');
    setUserRole(roleResponse[0].userRole);
    const bioResponse = await getUserByAttribute(loggedInUser, 'bio');
    setBio(bioResponse[0].bio);

  };

  window.addEventListener('resize', showButton);

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>Your Profile</h1>
      <div>
        <br />
        <h4>
          <u>User Information:</u>
          <br></br>
          <br></br>
        </h4>
        <h4>username: {loggedInUser}</h4>
        {firstName && <h4>first name: {firstName}</h4>}
        {lastName && <h4>last name: {lastName}</h4>}
        {userRole && <h4>user role: {userRole}</h4>}
        {bio && <h4>bio: {bio}</h4>}
      </div>
      <div>
      <YourQuestions loggedInUser={loggedInUser} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <div
          className="button-container"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {button && (
            <Button to="/ask-question" className="page-button" style={buttonStyles}>
              <i> Ask Question</i>
            </Button>
          )}
          {button && (
            <Button to="/schedule-appt" className="page-button" style={buttonStyles}>
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
     
      

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        
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