import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { getUser, getTutors, getTutorTimes, getTutorSubject } from '../../Api';

// TutorCard component to display tutor information
const TutorCard = ({ name, time, subject }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h2>{name}</h2>
      <p>Time: {time}</p>
      <p>Subject: {subject}</p>
      <Button to='/tutor-profile'>View Profile</Button>
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
  const [rating, setRating] = useState('');
  const [name, setName] = useState('');

  const [tutors, setTutors] = useState([]); //only has id and username
  const [tutorsInfo, setTutorsInfo] = useState([]); //tutor's name, times, and subjects taught

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
    getTutors().then(list => setTutors(list));

    //need tutors to have the following info: name, time, & subject
    const infos = [];
    for (let i = 0; i < tutors.length; i++) {
      const obj = { id: tutors[i]['tutorID'], name: '', time: '', subject: '' };

      getUser(tutors[i]['username']).then(user => {
        obj['name'] = user[0]['firstName'] + " " + user[0]['lastName'];
      });

      getTutorTimes(tutors[i]['tutorID']).then(time => {
        obj['time'] = time[0]['tutorTime'];
      });

      getTutorSubject(tutors[i]['tutorID']).then(subject => {
        obj['subject'] = subject[0]['subject'];
      });

      infos.push(obj);
    }
    setTutorsInfo(infos);
    console.log(tutorsInfo);

  }, [tutors, tutorsInfo]);

  window.addEventListener('resize', showButton);

  // Example data for tutors
  const tutorData = [
    { name: 'John Doe', time: '10:00 AM', subject: 'Math' },
    { name: 'Jane Smith', time: '11:00 AM', subject: 'Science' },
    { name: 'Bob Johnson', time: '1:00 PM', subject: 'History' },
  ];

  // Function to filter tutors based on user input
  const filterTutors = () => {

    console.log(tutors);
    console.log(tutorsInfo); //name, time, and subject are reset even though we called setTutorsInfo earlier

    return tutorsInfo.filter((tutor) => {
      const subjectMatch = !subject || tutor['subject'].toLowerCase().includes(subject.toLowerCase());
      const timeMatch = !time || tutor['time'].toLowerCase().includes(time.toLowerCase());
      const nameMatch = !name || tutor['name'].toLowerCase().includes(name.toLowerCase());

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
        <TutorCard key={tutor.id} name={tutor.name} time={tutor.time} subject={tutor.subject} />
      ))}
    </div>
  );
};
