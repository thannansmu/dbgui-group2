import React, { useState } from 'react';
import './CreateAccountForm.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';
import { AvailabilityList } from '../createAccount';
import { addUser } from '../../Api';
import { Link } from 'react-router-dom';
import { addTutorAvailability } from '../../Api';
import { TutorForm } from '../createAccount';
import { RegisterButton } from './RegisterButton';

export const CreateAccountForm = ({ accountType }) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  const onRegister = () => {

    addUser({ "username":userName, "passWord":password, "firstName":firstName,
              "lastName":lastName, "bio":bio, "userRole":accountType });
    setFirstName('');
    setLastName('');
    setBio('');
    setPassword('');
    setUserName('');
  };
  
  if (accountType){
    return (
      <div className='createAccountForm'>
        <h2>Create Account</h2>
        <div className='userForm'>
            <TextField
              id="createUserName"
              label="Username:"
              value={userName}
              setValue={setUserName}
            />
            <TextField
              id="createPassword"
              label="Password:"
              value={password}
              setValue={setPassword}
            />
            <TextField
              id="createFirstName"
              label="First Name:"
              value={firstName}
              setValue={setFirstName}
            />
            <TextField
              id="createLastName"
              label="Last Name:"
              value={lastName}
              setValue={setLastName}
            />
          <TextAreaField
            id="createBio"
            label="Bio:"
            value={bio}
            setValue={setBio}
          />
        </div>
        <br />
        <RegisterButton accountType={accountType} onRegister={onRegister} username={userName}/>
      </div>
    )
  }
};