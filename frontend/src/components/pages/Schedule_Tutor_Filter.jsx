import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { getTutors } from '../../Api/tutorApi';
import { getTutorRating } from '../../Api';
import { availabilityApi } from '../../Api/availabilityApi';
import { getTutorID } from '../../Api/availabilityApi';
import { getUserByAttribute } from '../../Api';
import { getTutorSubjectsTaught } from '../../Api';

// Function to set viewTutor when a student looks at a tutor's profile
const handleOpenTutorProfile = (setViewTutor, username) => {
  setViewTutor(username);
}

// TutorCard component to display tutor information
const TutorCard = ({ username, setViewTutor }) => {
  //const [rating, setRating] = useState(null);
  const [tutorID, setTutorID] = useState('');
  const [tutorFirstName, setTutorFirstName] = useState('');
  const [tutorLastName, setTutorLastName] = useState('');
  const [tutorTimes, setTutorTimes] = useState([]);
  const [tutorSubjects, setTutorSubjects] = useState([]);
  const [tutorRating, setTutorRating] = useState('');

  useEffect(() => {
    const fetchTutorID = async () => {
      try {
        const data = await availabilityApi.getTutorID(username);
        setTutorID(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutorID();
  }, [username]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const data = await availabilityApi.getAvailabilities(tutorID);
        setTutorTimes(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchAvailabilities();
    }
  }, [tutorID]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getTutorSubjectsTaught(tutorID);
        setTutorSubjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchSubjects();
    }
  }, [tutorID]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getTutorRating(tutorID);
        setTutorRating(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchRatings();
    }
  }, [tutorID]);

  const getUserInfo = async () => {
    const response = await getUserByAttribute(username, 'firstName');
    setTutorFirstName(response[0].firstName);
    const lastResponse = await getUserByAttribute(username, 'lastName');
    setTutorLastName(lastResponse[0].lastName);
  };

  //tutor card html return statement
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{tutorFirstName} {tutorLastName}</h2>
      <p>Times available: {}</p>
      <p>Subjects taught: {tutorSubjects}</p>
      {tutorRating !== null ? <p>Rating: {tutorRating}</p> : <p>Loading rating...</p>}

      <Button to='/tutor-student' onClick={() => setViewTutor(username)}>View Profile</Button>
      <Button to={`/calendar-view/${username}`}>Book Appointment</Button>
      <Button to={`/review-tutor/${username}`}>Rate Tutor</Button>
    </div>
  );
};


// Example data for tutors
const tutorData = [
  { username: 'user6', name: 'Sarah Garcia', time: '3:00 PM', subject: 'Computer Science' },
  { username: 'user7', name: 'Thomas Anderson', time: '5:00 PM', subject: 'Writing' },
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
  const [tutorUsername, setTutorUsername] = useState('');
  const [tutorID, setTutorID] = useState('');
  const [tutorFirstName, setTutorFirstName] = useState('');
  const [tutorLastName, setTutorLastName] = useState('');
  const [tutorFullName, setTutorFullName] = useState('');
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
    getTutors()
      .then(data => setTutors(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchTutorID = async () => {
      try {
        const data = await availabilityApi.getTutorID(tutorUsername);
        setTutorID(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutors && tutorUsername) {
      fetchTutorID();
    }
  }, [tutorUsername]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const data = await availabilityApi.getAvailabilities(tutorID);
        setTutorTimes(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchAvailabilities();
    }
  }, [tutorID]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getTutorSubjectsTaught(tutorID);
        setTutorSubjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchSubjects();
    }
  }, [tutorID]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getTutorRating(tutorID);
        setTutorRating(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchRatings();
    }
  }, [tutorID]);

  const getUserInfo = async () => {
    const response = await getUserByAttribute(tutorUsername, 'firstName');
    setTutorFirstName(response[0].firstName);
    const lastResponse = await getUserByAttribute(tutorUsername, 'lastName');
    setTutorLastName(lastResponse[0].lastName);
  };

  console.log(tutors);
  getUserInfo();
  


  window.addEventListener('resize', showButton);

  // Function to filter tutors based on user input
  const filterTutors = () => {

    return tutorData.filter((tutor) => {
      const subjectMatch = !subject || tutor.subject.toLowerCase().includes(subject.toLowerCase());
      //const timeMatch = !time || tutor.time.toLowerCase().includes(time.toLowerCase());
      const nameMatch = !name || tutor.name.toLowerCase().includes(name.toLowerCase());

      // Function to filter tutors based on user input
      return subjectMatch && nameMatch;
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
        <TutorCard username={'user6'} setViewTutor={() => handleOpenTutorProfile(setViewTutor, 'user6')} />
    </div>
  );
};
