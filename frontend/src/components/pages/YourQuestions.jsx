import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const YourQuestions = ({ loggedInUser }) => {
  const [studentID, setStudentID] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Make API call to retrieve student ID for given username
    axios.get(`http://localhost:8000/students?username=${loggedInUser}`)
      .then(response => {
        // If response is successful, set the student ID state
        setStudentID(response.data[1].studentID);

       
      })
      .catch(error => {
        console.log(error);
      });
  }, [loggedInUser]);

  return (
    <div>
      <h2><u>Your Questions</u></h2>
      <h3>Username: {loggedInUser}</h3>
      <h3>Student ID: {studentID}</h3>
      <h3>Questions:</h3>
      <ul>
       
      </ul>
    </div>
  );
}

