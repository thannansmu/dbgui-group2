// LoginForm.js
import { useNavigate } from 'react-router-dom';
import { LoginCheck } from '../../Api';
import { useState, useEffect } from 'react';
import { TextField } from '../common';
import '../styles/LoginForm.css';
import '../styles/Button.css';

export const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //calls login route & navigate to student/admin or tutor if successful
  const handleSubmit = async (e) => {
    e.preventDefault();

    LoginCheck(username).then((accessToken) => {
      if (accessToken[0] != null && accessToken[0]['passWord'] === password) {
        setUsername('');
        setPassword('');

        if (accessToken[0]['userRole'] === 'student') {
          setLoggedInUser(username);
          navigate('/profile');
        } else {
          setLoggedInUser(username);
          navigate('/tutor-profile');
        }

        console.log('Successful login!');
      } else {
        setUsername('');
        setPassword('');
        alert('Unsuccessful login attempt. Please try again.');
      }
    });
  };

  return (
    <>
      <h1 className="login-title">Login</h1>

      <div className="login-form">
        <div className="login-field">
          <TextField
            id="username"
            label="Username"
            value={username}
            setValue={setUsername}
          />
        </div>

        <div className="login-field">
        <TextField
  id="password"
  label="Password"
  value={password}
  setValue={setPassword}
  type="password" // Add this line. 
/>
        </div>

        <button className="btn" type="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </>
  );
};
