import { useState, useEffect } from 'react';
import { TextField } from '../common';
import '../styles/LoginForm.css';
import '../styles/Button.css';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*call the backend to see if the username & password exist in user table*/

    /*remember to got to call post route*/

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

            <button className='btn' type='button'>Login</button>
        </div>
    </>;
}