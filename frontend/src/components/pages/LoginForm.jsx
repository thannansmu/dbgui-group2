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
  const handleSubmit = async () => {
    //e.preventDefault(); DO NOT PUT THIS BACK FOR NOW BUT IF NEED PUT e in async

    LoginCheck(username).then((accessToken) => {
      if (accessToken[0] != null && accessToken[0]['passWord'] === password) {
        setUsername('');
        setPassword('');
        setLoggedInUser(username);

        if (accessToken[0]['userRole'] === 'student') {
          navigate('/profile');
        } else if (accessToken[0]['userRole'] === 'tutor') {
          navigate('/tutor-profile');
        } else if (accessToken[0]['userRole'] === 'admin') {
          navigate('/admin-page');
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
            className="form-control"
          />
        </div>

        <div className="login-field">
          <TextField
            id="password"
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
            variant="outlined"
            className="form-control"
          />
        </div>

        <button className="btn" type="button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </>
  );
};
