import React, { useState, useEffect } from 'react';
import { getQuestions, updateAnswer } from '../../../Api';

export const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [answerText, setAnswerText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedQuestion) {
      try {
        await updateAnswer(selectedQuestion.questionText, answerText);
        const data = await getQuestions();
        setQuestions(data);
        setSelectedQuestion(null);
        setAnswerText('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF9C4', padding: '50px' }}>
      <h1 style={{ textShadow: '2px 2px 4px #000000', color: '#000000', fontWeight: 'bold' }}>
        All Student Questions
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.isArray(questions) && questions.map((question, index) => (
          <div
            key={index}
            style={{ backgroundColor: '#cbf2ba', padding: '20px', borderRadius: '10px', margin: '10px 0' }}
            onClick={() => setSelectedQuestion(question)}
          >
            <h3 style={{ color: '#000000' }}>Student ID: {question.studentID}</h3>
            <p style={{ color: '#000000' }}>Question: {question.questionText}</p>
          </div>
        ))}
      </div>
      {selectedQuestion && (
       <form onSubmit={handleSubmit}>
       <label>
         Answer to {selectedQuestion.questionText}:
         <input type="text" value={answerText} onChange={(e) => setAnswerText(e.target.value)} />
       </label>
       <button type="submit">Submit</button>
     </form>
     
      )}
    </div>
  );
};


