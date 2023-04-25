import { useState, useEffect } from 'react';
import { UserInfo } from '../UserInfo';
import { Button } from '../../Button';
import '../../styles/Tutor.css';
import '../../styles/Button.css';
import { getTutor, getUserByAttribute } from '../../../Api/userApi';
import { AllQuestions } from './AllQuestions'; // Update the path to the AllQuestions component
import {getTutorID, getTutorAnswers} from '../../../Api/tutorApi'
import { Link } from 'react-router-dom';



export const TutorProfile = ({ loggedInUser }) => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [bio, setBio] = useState('');
    const [tutorID, setTutorID] = useState(null);
    const [answers, setAnswers] = useState([]);



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
      const tutorIdResponse = await getTutorID(loggedInUser);
      const newTutorId = tutorIdResponse[0].tutorID;
      setTutorID(newTutorId);
      console.log("The tutor ID response is", newTutorId);
      if (tutorID) {
        const fetchedAnswers = await getTutorAnswers(newTutorId);
        setAnswers(fetchedAnswers);
        console.log("the answers are", fetchedAnswers);
      }
      
    };


    window.addEventListener('resize', showButton);

    return (
<div style={{ backgroundColor: '#AED6F1', padding: '50px' }}>
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
        <div style={{ backgroundColor: '#AED6F1', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>

            <div className="button-container" style={{ backgroundColor: '#AED6F1', display: 'flex', flexDirection: 'column' }}>


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

        <div
      style={{
        backgroundColor: '#AED6F1',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <h2 className="title">Your Answers</h2>
      <br />
      <div
        style={{
          marginTop: '130px', // increase this value to move answers down
          paddingLeft: '200px', // increase this value to move answers to the left
          borderLeft: '2px solid #666',
          marginLeft: '20px',
          maxWidth: '80%',
        }}
      >
        {answers.map((answer) => (
          <div key={answer.questionID} style={{ marginBottom: '10px' }}>
            <p>
              <b>Question ID:</b> {answer.questionID}
            </p>
            <p>{answer.answer}</p>
            <hr />
          </div>
        ))}
      </div>
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

