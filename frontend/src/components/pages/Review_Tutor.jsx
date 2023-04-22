import React, { useState, useEffect } from 'react';
import { getTutors, getTutorID } from '../../Api/tutorApi';

export const Review_Tutor = () => {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTutors = await getTutors();
      const tutorsWithIDs = await Promise.all(
        fetchedTutors.map(async (tutor) => {
          const tutorID = await getTutorID(tutor.username);
          return { ...tutor, tutorID };
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

  return (
    <div>
      <h1>Review</h1>
      <input type="text" placeholder="Search by username" value={searchTerm} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Tutor ID</th>
          </tr>
        </thead>
        <tbody>
  {filteredTutors.map((tutor, index) => (
    <tr key={index}>
      <td>{tutor.username}</td>
      <td>{tutor.tutorID[0].tutorID}</td>

    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

