import React, { useState, useEffect } from 'react';
import { getUsernames, addReport } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';


export const ReportUser = () => {
    const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [reportText, setReportText] = useState('');
  const [showReportInput, setShowReportInput] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernames = await getUsernames();
      setUsernames(usernames.map(user => user.username));
    };

    fetchUsernames();
  }, []);

  const filterUsernames = () => {
    return usernames.filter(username =>
      username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const submitReport = async () => {
    if (selectedUser && reportText.trim()) {
      const adminID = 1; // Replace this with the actual admin ID when available
      await addReport(selectedUser, 1, { report: reportText });
      setReportText('');
      alert('Report submitted successfully');
    } else {
      alert('Please enter a report text');
    }
  };

  return (
    <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <button
        onClick={() => navigate(-1)}
        className="btn btn-primary mb-4"
        style={{ position: 'absolute', left: '80rem', top: '2rem' }}
      >
        &larr; Back
      </button>
      <h1 style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>Report User:</h1>
      <input
        type="text"
        placeholder="Search for a username..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '12px 20px', marginBottom: '12px' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {filterUsernames().map(username => (
          <div
            key={username}
            onClick={() => {
              setSelectedUser(username);
              setShowReportInput(true);
            }}
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              padding: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            <h3>{username}</h3>
          </div>
        ))}
      </div>
      {showReportInput && (
        <div style={{ marginTop: '16px' }}>
          <h3>Selected user: {selectedUser}</h3>
          <textarea
            value={reportText}
            onChange={e => setReportText(e.target.value)}
            style={{ width: '100%', minHeight: '150px', padding: '12px 20px', marginBottom: '12px' }}
            placeholder="Enter your report here..."
          />
          <button onClick={submitReport}>Submit Report</button>
        </div>
      )}
    </div>
  );
};



