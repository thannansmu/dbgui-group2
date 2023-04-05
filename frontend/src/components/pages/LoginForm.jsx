import { useState, useEffect } from 'react';
import { TextField } from '../common';

export const LoginForm = ({ accountType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*if accountType = student, tutor, or admin, call the backend
      to see if the username & password exist in those tables*/

    /*remember to got to call post route*/

    return <>
        <h1>Login</h1>

        <TextField id='username'
            label='Username'
            value={username}
            setValue={setUsername} />

        <TextField id='password'
            label='Password'
            value={password}
            setValue={setPassword} />

        <button type='button'>Login</button>
    </>;
}