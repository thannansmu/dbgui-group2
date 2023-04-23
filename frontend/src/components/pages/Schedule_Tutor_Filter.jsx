import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

// TutorCard component to display tutor information
const TutorCard = ({ name, time, subject }) => {
  //hardcoded the username in the meantime until i connect this page to the api
  const username= 'user6';

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{name}</h2>
      <p>Time: {time}</p>
      <p>Subject: {subject}</p>
      <Button onClick={() => {
        console.log(`Viewing profile for ${name}`);
        // TODO: Implement logic to display tutor's profile
      }}>View Profile</Button>
      <Button to={`/calendar-view/${username}`}>Book Appointment</Button>
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
  const [name, setName] = useState('');
  //const [selectedTutor, selectedTutorID] = useState('');

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

  /*
  useEffect(() => {
    availabilityApi.getTutorID(username)
    .then(data => setTutorID(data))
    .catch(error => console.log(error));
}, []);
*/

  window.addEventListener('resize', showButton);

  // Example data for tutors
  const tutorData = [
    { name: 'John Doe', time: '10:00 AM', subject: 'Math' },
    { name: 'Jane Smith', time: '11:00 AM', subject: 'Science' },
    { name: 'Bob Johnson', time: '1:00 PM', subject: 'History' },
  ];

  // Function to filter tutors based on user input
  const filterTutors = () => {
    return tutorData.filter((tutor) => {
      const subjectMatch = !subject || tutor.subject.toLowerCase().includes(subject.toLowerCase());
      const timeMatch = !time || tutor.time.toLowerCase().includes(time.toLowerCase());
      const nameMatch = !name || tutor.name.toLowerCase().includes(name.toLowerCase());

      return subjectMatch && timeMatch && nameMatch;
    });
  };

  const filteredTutors = filterTutors();

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
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Changed variable name from 'rating' to 'name' */}
      </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
      </div>
      {filteredTutors.map((tutor) => (
        <TutorCard key={tutor.name} name={tutor.name} time={tutor.time} subject={tutor.subject}/>
      ))}
    </div>
  );
};
