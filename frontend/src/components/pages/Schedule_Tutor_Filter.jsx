import React, { useState, useEffect } from 'react';
import { Button } from '../Button';

// TutorCard component to display tutor information
const TutorCard = ({ name, time, subject }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{name}</h2>
      <p>Time: {time}</p>
      <p>Subject: {subject}</p>
      <Button onClick={() => {
        console.log(`Viewing profile for ${name}`);
        // TODO: Implement logic to display tutor's profile
      }}>View Profile</Button>
      <Button>Book Appointment</Button>
    </div>
  );
};

// Schedule_Tutor_Filter component to display tutor filter page
export const Schedule_Tutor_Filter = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');



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
      <h1><b><u>Filters:</u></b></h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
      </div>
      <TutorCard name="John Doe" time="10:00 AM" subject="Math" />
      <TutorCard name="Jane Smith" time="11:00 AM" subject="Science" />
      <TutorCard name="Bob Johnson" time="1:00 PM" subject="History" />
    </div>
  );
};
