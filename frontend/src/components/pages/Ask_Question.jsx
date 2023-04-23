import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../styles/Button.css';
import { useLocation } from 'react-router-dom';
import { addNewQuestion } from '../../Api';


export const Ask_Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentID = queryParams.get('studentID');

  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');

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
};


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
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
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
