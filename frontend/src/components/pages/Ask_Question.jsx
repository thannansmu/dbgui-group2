import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../styles/Button.css'

export const Ask_Question = () => {
    const [subject, setSubject] = useState("");
    const [question, setQuestion] = useState("");

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    }

    const handleSubmit = () => {
        console.log(`Subject: ${subject}`);
        console.log(`Question: ${question}`);
        // TODO: Implement logic to submit question
    }



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
            <h1>Ask A Question</h1>
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
            <Button to="/main-student-screen" className="page-button">
            <i> Submit</i>
            </Button>
          )}
        </div>
    );
};