import React, { useState, useEffect } from 'react';
import { getReportedUsernames, getReportForUsername } from '../../Api';

export const ViewReports = () => {
  const [reportedUsernames, setReportedUsernames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReportedUsernames = async () => {
      const usernames = await getReportedUsernames();
      const usernamesWithReports = await Promise.all(usernames.map(async user => {
        const report = await getReportForUsername(user.username);
        return { ...user, report };
      }));
      setReportedUsernames(usernamesWithReports);
    };

    fetchReportedUsernames();
  }, []);

  const filterReportedUsernames = () => {
    return reportedUsernames.filter(user =>
      user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div style={{ backgroundColor: '#E0BBE4', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <h1>View User Reportings:</h1>
      <input
        type="text"
        placeholder="Search for a reported username..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '12px 20px', marginBottom: '12px' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {filterReportedUsernames().map(user => (
          <div
            key={user.username}
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              padding: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>{user.username}</h3> 
            {user.report && user.report.length > 0 && <p>{user.report[0].report}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};



