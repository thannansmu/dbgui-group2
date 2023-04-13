import { Link } from 'react-router-dom';
import { LoginCheck } from '../../api'
import { useState, useEffect } from 'react';
import { TextField } from '../common';
import '../styles/LoginForm.css';
import '../styles/Button.css';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() =>{
        setErrorMsg('');
    }, [username, password]);

    //need to somehow call login route & navigate to student/admin or tutor
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        LoginCheck(username, password).then(accessToken => {
            if (accessToken != null) {
                setUsername('');
                setPassword('');
            }
            else {
                setErrorMsg("Unsuccessful login attempt. Please try again.");
            }
        });
    };

    return <>
        <h1 className='login-title'>Login</h1>

        <div className='login-form'>
            <div className='login-field'>
                <TextField id='username'
                    label='Username'
                    value={username}
                    setValue={setUsername} />
            </div>

            <div className='login-field'>
                <TextField id='password'
                    label='Password'
                    value={password}
                    setValue={setPassword} />
            </div>

            <button className='btn' type='button' onClick={ handleSubmit }>Login</button>
        </div>
    </>;
}