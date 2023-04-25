import { useState, useEffect } from 'react';
import { UserInfo } from '../UserInfo';
import { Button } from '../../Button';
import '../../styles/Tutor.css';
import '../../styles/Button.css';
import { getTutor, getTutorId, getUserByAttribute } from '../../../Api/userApi';

export const TutorProfile = ({ loggedInUser }) => {
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
      <div style={{ backgroundColor: 'white', padding: '50px' }}>
        <h1 style={{ textDecoration: 'underline' }}>Your Profile</h1>
        <div>
          <br />
          <h4>
            <br></br>
            <br></br>
          </h4>
          <h4>username: {loggedInUser}</h4>
          {firstName && <h4>first name: {firstName}</h4>}
          {lastName && <h4>last name: {lastName}</h4>}
          {userRole && <h4>user role: {userRole}</h4>}
          {bio && <h4>bio: {bio}</h4>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>

            <div className="button-container" style={{ display: 'flex', flexDirection: 'column' }}>

                {button && (
                    <Button to="/appts" className="page-button" style={buttonStyles}>
                        <i>  View Appointments</i>
                    </Button>
                )}

                {button && (
                    <Button to="/questions" className="page-button" style={buttonStyles}>
                        <i> View Questions</i>
                    </Button>
                )}

                {button && (
                    <Button to="/review-student" className="page-button" style={buttonStyles}>
                        <i> Review Student</i>
                    </Button>
                )}
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <h2 className='title'>Your Answers</h2>

            <h2 className='title'>Your Reviews</h2>
        </div>
        </div>
    );
}

const buttonStyles = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  padding: '10px 20px',
  color: '',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  display: 'inline-block',
  textAlign: 'center',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '10px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  ':hover': {
    backgroundColor: '#eee',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
  }
};

