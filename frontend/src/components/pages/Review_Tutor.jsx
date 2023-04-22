import React, { useState, useEffect } from 'react';
import { getTutors, getTutorID, getTutorSubjectsTaught } from '../../Api/tutorApi';
import { FaStar } from 'react-icons/fa';

export const Review_Tutor = () => {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTutors = await getTutors();
      const tutorsWithIDs = await Promise.all(
        fetchedTutors.map(async (tutor) => {
          const tutorID = await getTutorID(tutor.username);
          const subjectsTaught = await getTutorSubjectsTaught(tutorID[0].tutorID);
          return { ...tutor, tutorID: tutorID[0].tutorID, subjectsTaught };
        })
      );
      setTutors(tutorsWithIDs);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTutors = tutors.filter((tutor) => {
    return tutor.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderStars = (rating) => {
    const numStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    return stars;
  }

  return (
    <div>
      <h1>Review</h1>
      <input type="text" placeholder="Search by username" value={searchTerm} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Tutor ID</th>
            <th>Subjects Taught</th>
            <th>Your Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredTutors.map((tutor, index) => (
            <tr key={index}>
              <td>{tutor.username}</td>
              <td>{tutor.tutorID}</td>
              <td>{tutor.subjectsTaught.map((subject, i) => (
                <span key={i}>{subject.subject} </span>
              ))}</td>
              <td>{renderStars(tutor.rating)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




