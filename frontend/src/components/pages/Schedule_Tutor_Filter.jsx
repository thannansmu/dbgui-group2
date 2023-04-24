import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { getTutors } from '../../Api/tutorApi';
import { getTutorRating } from '../../Api';
import {getTutorID} from '../../Api'

// Function to set viewTutor when a student looks at a tutor's profile
const handleOpenTutorProfile = (setViewTutor, username ) => {
  setViewTutor(username);
}

// TutorCard component to display tutor information
const TutorCard = ({ username, name, timesAvailable, subjectsTaught, setViewTutor }) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const tutorID = await getTutorID(username);
        const userRating = await getTutorRating(tutorID);
        console.log("Rating for", tutorID, "is", userRating);
        setRating(userRating);
      } catch (error) {
        console.error("Failed to fetch user rating: ", error);
      }
    };

    fetchRating();
  }, [username]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{name}</h2>
      <p>Times available: {timesAvailable}</p>
      <p>Subjects taught: {subjectsTaught}</p>
      {rating !== null ? <p>Rating: {rating}</p> : <p>Loading rating...</p>}

      <Button to='/tutor-student' onClick={() => setViewTutor(username)}>View Profile</Button>
      <Button to={`/calendar-view/${username}`}>Book Appointment</Button>
    </div>
  );
};


// Example data for tutors
const tutorData = [
  { username: 'user6', name: 'Sarah Garcia', time: '3:00 PM', subject: 'Computer Science' },
  { username: 'user7', name: 'Thomas Anderson', time: '5:00 PM', subject: 'Writing'   },
  { username: 'user11', name: 'Patrick Bateman', time: '7:00 AM', subject: 'Business' },
];

// Schedule_Tutor_Filter component to display tutor filter page
export const Schedule_Tutor_Filter = ({ setViewTutor }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');

  //tutor data
  const [tutors, setTutors] = useState([]);
  const [tutorID, setTutorID] = useState('');
  const [tutorFirstName, setTutorFirstName] = useState('');
  const [tutorLastName, setTutorLastName] = useState('');
  const [tutorTimes, setTutorTimes] = useState([]);
  const [tutorSubjects, setTutorSubjects] = useState([]);
  const [tutorRating, setTutorRating] = useState('');


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
    getTutors().then(x => setTutors(x));
  }, []);

console.log(tutors);

  /*
  useEffect(() => {
    availabilityApi.getTutorID(username)
    .then(data => setTutorID(data))
    .catch(error => console.log(error));
}, []);
*/

  window.addEventListener('resize', showButton);

  // Function to filter tutors based on user input
  const filterTutors = () => {

    return tutorData.filter((tutor) => {
      const subjectMatch = !subject || tutor.subject.toLowerCase().includes(subject.toLowerCase());
      const timeMatch = !time || tutor.time.toLowerCase().includes(time.toLowerCase());
      const nameMatch = !name || tutor.name.toLowerCase().includes(name.toLowerCase());

      // Function to filter tutors based on user input
      return subjectMatch && timeMatch && nameMatch;
    });
  };

  // const [filteredTutors, setFilteredTutors] = useState([]);
  const filteredTutors = filterTutors();

  // useEffect(() => {
  //   filterTutors().then((tutors) => setFilteredTutors(tutors));
  // }, [subject, time, name]);

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
      <TutorCard key={tutor.username} username={tutor.username} name={tutor.name} timesAvailable={tutor.time} subjectsTaught={tutor.subject} rating={tutor.rating}  setViewTutor={() => handleOpenTutorProfile(setViewTutor, tutor.username)} />
      ))}
    </div>
  );
};
