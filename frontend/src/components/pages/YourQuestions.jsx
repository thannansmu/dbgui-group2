import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStudentIDByUsername } from '../../Api';
import {getQuestionTextsByStudentID} from'../../Api';
import { Link } from 'react-router-dom';

export const YourQuestions = ({ loggedInUser }) => {
  const [studentID, setStudentID] = useState('');
  const [questions, setQuestions] = useState([]);

  const linkStyles = {
    textDecoration: 'none',
    color: 'black',
    fontStyle: 'italic'
  };

  useEffect(() => {
    // Make API call to retrieve student ID for given username
    getStudentIDByUsername(loggedInUser).then(x => setStudentID(x));
  }, [loggedInUser]);

  useEffect(() => {
    // Make API call to retrieve questions for the student ID
    if (studentID !== '') {
      getQuestionTextsByStudentID(studentID)
        .then(x => setQuestions(x))
        .catch(error => console.error(error));
    }
  }, [studentID]);

  const askQuestionLink = `/ask-question?studentID=${studentID}`;

  return (
    <div>
      <h2><u>Your Questions</u></h2>
      <h3>Username: {loggedInUser}</h3>
      <h3>Student ID: {studentID}</h3>
      <h1>Your Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
      <div style={{ position: 'absolute', bottom: 350, right: 128 }}>
      <Link to={askQuestionLink} style={linkStyles}>Ask a Question</Link></div>
    </div>
  );
};



