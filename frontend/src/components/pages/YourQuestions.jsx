import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStudentIDByUsername } from '../../Api';
import { getQuestionTextsByStudentID, deleteQuestionByQuestionText } from '../../Api';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export const YourQuestions = ({ loggedInUser }) => {
  const [studentID, setStudentID] = useState('');
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const linkStyles = {
    textDecoration: 'none',
    color: 'black',
    fontStyle: 'italic',
  };

  useEffect(() => {
    // Make API call to retrieve student ID for given username
    getStudentIDByUsername(loggedInUser).then((x) => setStudentID(x));
  }, [loggedInUser]);

  useEffect(() => {
    // Make API call to retrieve questions for the student ID
    if (studentID !== '') {
      getQuestionTextsByStudentID(studentID)
        .then((x) => setQuestions(x))
        .catch((error) => console.error(error));
    }
  }, [studentID]);

  const askQuestionLink = `/ask-question?studentID=${studentID}`;

  const handleDeleteQuestion = async (questionText) => {
    try {
      await deleteQuestionByQuestionText(questionText);
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q !== questionText));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <br></br>
      <h1>Your Questions</h1>
      <div>
      <input
  type="text"
  id="search"
  name="search"
  placeholder="Search for a Question"
  value={searchTerm}
  onChange={handleSearchChange}
  style={{
    display: 'block',
    margin: 0,
    padding: '10px',
    width: '300px',
    boxSizing: 'border-box',
    float: 'left'
  }}
/>
<br></br>
<br></br>
      </div>
      <ul>
        {filteredQuestions.map((question, index) => (
          <li key={index}>
            <span>{question}</span>
            <button onClick={() => handleDeleteQuestion(question)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '15px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            to={askQuestionLink}
            className="page-button"
            style={{ marginBottom: '10px', marginRight: '10em' }}
          >
            <i>Ask a Question</i>
          </Button>
        </div>
      </div>
    </div>
  );
};





