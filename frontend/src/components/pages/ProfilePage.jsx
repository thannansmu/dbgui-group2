import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';
import { YourQuestions } from './YourQuestions';
import { Button } from '../Button';
import '../styles/Button.css';
import { getUserByAttribute } from '../../Api/userApi';
import { Ask_Question } from './Ask_Question';

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
    <div style={containerStyle}>
  <h1 style={headingStyle}>Your Profile</h1>
  <div style={userInfoContainerStyle}>
    <div style={userInfoHeaderStyle}>
      <h4 style={userInfoTitleStyle}>User Information:</h4>
    </div>
    <div style={userInfoContentStyle}>
      <h4 style={userInfoTextStyle}>username: {loggedInUser}</h4>
      {firstName && <h4 style={userInfoTextStyle}>first name: {firstName}</h4>}
      {lastName && <h4 style={userInfoTextStyle}>last name: {lastName}</h4>}
      {userRole && <h4 style={userInfoTextStyle}>user role: {userRole}</h4>}
      {bio && <h4 style={userInfoTextStyle}>bio: {bio}</h4>}
    </div>
  </div>
  <div style={yourQuestionsContainerStyle}>
    <YourQuestions loggedInUser={loggedInUser} />
  </div>
  <div style={buttonContainerStyle}>
    {button && (
      <Button to="/report-user" className="page-button" style={buttonStyles}>
        <i>Report User</i>
      </Button>
    )}
    {button && (
      <Button to="/schedule-appt" className="page-button" style={buttonStyles}>
        <i>Schedule Appointment</i>
      </Button>
    )}
    <br></br>
    <br></br>
    {/* {button && (
      <Button to="/booked-appt" className="page-button" style={buttonStyles}>
        <i>Your Booked Appointments</i>
      </Button>
    )} */}
  </div>
</div>

  );
};

const containerStyle = {
  margin: '50px auto',
  maxWidth: '800px',
  padding: '0 20px',
  backgroundColor: '#F5F5F5',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const headingStyle = {
  textAlign: 'center',
  textDecoration: 'underline',
  fontSize: '36px',
  margin: '0 0 50px',
  color: '#333',
};

const userInfoContainerStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '50px',
};

const userInfoHeaderStyle = {
  borderBottom: '1px solid #CCCCCC',
  paddingBottom: '10px',
  marginBottom: '20px',
};

const userInfoTitleStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
  margin: '0 0 10px',
};

const userInfoContentStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const userInfoTextStyle = {
  fontSize: '18px',
  margin: '0 0 10px',
};

const yourQuestionsContainerStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '50px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
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
  marginBottom: '10px',
  marginRight: '10px',
};