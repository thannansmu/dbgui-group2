import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../styles/Button.css';
import { useLocation } from 'react-router-dom';
import { addNewQuestion, getUniqueSubjects, addSubjectTaught } from '../../Api';
import { useNavigate } from 'react-router-dom';


export const Ask_Question = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentID = queryParams.get('studentID');

  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [subjects, setSubjects] = useState([]);

  const handleSubjectChange = e => {
    setSubject(e.target.value);
  };

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`Subject: ${subject}`);
    console.log(`Question: ${question}`);

    const formattedQuestion = `${question} (${subject})`;

    addNewQuestion('username', studentID, '1', formattedQuestion, '') 
      .then(response => {
        console.log(response);
        alert('Question submitted successfully');
        setSubject('');
        setQuestion('');
      })
      .catch(error => console.error(error));

    if (!subjects.includes(subject)) {
      addSubjectTaught('username', null, subject)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    getUniqueSubjects()
      .then(data => setSubjects(data))
      .catch(error => console.error(error));
  }, []);

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
      <h1><i>Ask A Question</i></h1>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="subject">Subject: </label>
        <select id="subject" name="subject" value={subject} onChange={handleSubjectChange}>
          <option value="">Select a subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
        {!subjects.includes(subject) && (
          <div>
            <label htmlFor="new-subject">Enter a new subject: </label>
            <input type="text" id="new-subject" name="new-subject" value={subject} onChange={handleSubjectChange} />
          </div>
        )}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="question">Question: </label>
        <textarea id="question" name="question" rows="5" value={question} onChange={handleQuestionChange}></textarea>
      </div>
      {button && (
        <Button to="/profile" onClick={handleSubmit} className="page-button">
          <i>Submit</i>
        </Button>
      )}
    </div>
 

  );
};

