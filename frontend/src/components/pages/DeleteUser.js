import React, { useState, useEffect } from 'react';
import { getUsernames, deleteUser } from '../../Api/userApi';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap

export const DeleteUser = () => {
  const [usernames, setUsernames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDeleteUser = async (username) => {
    await deleteUser(username);
    setUsernames(usernames.filter(user => user !== username));
  };

  return (
    <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <h1>Eliminate User:</h1>
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
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              padding: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>{username}</h3>
            <Button variant="danger" onClick={() => handleDeleteUser(username)}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
