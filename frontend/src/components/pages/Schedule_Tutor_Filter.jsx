import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { getTutors, getTutorSubjectsTaught} from '../../Api/tutorApi';

// TutorCard component to display tutor information
const TutorCard = ({ name, timesAvailable, subjectsTaught }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{name}</h2>
      <p>Times available: {timesAvailable}</p>
      <p>Subjects taught: {subjectsTaught}</p>
      <Button onClick={() => {
        console.log(`Viewing profile for ${name}`);
        // TODO: Implement logic to display tutor's profile
      }}>View Profile</Button>
      <Button to='/calendar-view'>Book Appointment</Button>
    </div>
  );
};


// Schedule_Tutor_Filter component to display tutor filter page
export const Schedule_Tutor_Filter = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');

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

  // Function to filter tutors based on user input
  const filterTutors = async () => {
    try {
      const tutors = await getTutors();
      return tutors.filter((tutor) => {
        const subjectMatch = !subject || tutor.subjectsTaught.includes(subject.toLowerCase());
        const timeMatch = !time || tutor.timesAvailable.some(ta => ta.tutorTime.toLowerCase().includes(time.toLowerCase()));
        const nameMatch = !name || tutor.username.toLowerCase().includes(name.toLowerCase());

        return subjectMatch && timeMatch && nameMatch;
      });
    } catch (error) {
      alert(error);
      return [];
    }
  };

  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    filterTutors().then((tutors) => setFilteredTutors(tutors));
  }, [subject, time, name]);

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
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      </div>
      {filteredTutors.map((tutor) => (
  <TutorCard key={tutor.tutorID} name={tutor.username} times_available={tutor.timesAvailable} subjects_taught={tutor.subjectsTaught} />
))}



    </div>
  );
};
