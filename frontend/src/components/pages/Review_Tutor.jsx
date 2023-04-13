import React, { useState, useEffect } from 'react';

export const Review_Tutor = () => {
    const [tutors, setTutors] = useState([
        { name: 'John Doe', subject: 'Math' },
        { name: 'Jane Smith', subject: 'Science' },
        { name: 'Bob Johnson', subject: 'History' },
      ]);
      const [searchTerm, setSearchTerm] = useState('');
    
      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const filteredTutors = tutors.filter((tutor) => {
        const nameMatches = tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const subjectMatches = tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatches || subjectMatches;
      });
    
      return (
        <div>
          <h1>Review</h1>
          <input type="text" placeholder="Search by name or subject" value={searchTerm} onChange={handleSearch} />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {filteredTutors.map((tutor, index) => (
                <tr key={index}>
                  <td>{tutor.name}</td>
                  <td>{tutor.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};
