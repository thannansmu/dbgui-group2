import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStudentIDByUsername } from '../../Api';

export const YourQuestions = ({ loggedInUser }) => {
  const [studentID, setStudentID] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Make API call to retrieve student ID for given username
    getStudentIDByUsername(loggedInUser).then(x=>setStudentID(x))
  }, [loggedInUser]);

  useEffect(() => {
    // Make API call to retrieve questions for student ID
    if (studentID) {
      axios.get(`http://localhost:8000/student/${studentID}/questions`)
        .then(response => {
          // If response is successful, set the questions state
          setQuestions(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [studentID]);

  return (
    <div>
      <h2><u>Your Questions</u></h2>
      <h3>Username: {loggedInUser}</h3>
      <h3>Student ID: {studentID}</h3>
      <h3>Questions:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.questionText}</li>
        ))}
      </ul>
    </div>
  );
}


