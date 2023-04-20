import React, { useState } from 'react';
import './CreateAccountForm.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';
import { AvailabilityList } from '../createAccount';
import { addUser } from '../../Api';

const TutorForm = ({ accountType }) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checkedItems, setCheckedItems] = useState("");
  const [availability, setAvailability] = useState([]);

  const addAvailability = () => {

    if (day && startTime && endTime) {
      const newAvailableTime = (
        <div key={availability.length}>
          <div className="availableTime">{day}: {startTime} - {endTime}</div>
        </div>
      );
      setAvailability([...availability, newAvailableTime]);
      setDay('');
      setStartTime('');
      setEndTime('');
    };
  };

  const removeAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability.splice(index, 1);
    setAvailability(newAvailability);
  };

  if (accountType === "tutor") {
    const subjects = [
      { value: 1, name: "Math" },
      { value: 2, name: "Science" },
      { value: 3, name: "Writing" },
      { value: 4, name: "History" },
    ];

    const days = [
      { value: "Monday", label: "Monday" },
      { value: "Tuesday", label: "Tuesday" },
      { value: "Wednesday", label: "Wednesday" },
      { value: "Thursday", label: "Thursday" },
      { value: "Friday", label: "Friday" },
      { value: "Saturday", label: "Saturday" },
      { value: "Sunday", label: "Sunday" },
    ];

    return (
      <>
        <h3>Subjects Taught:</h3>
        <div className='tutorForm-checkbox'>
          <CheckboxList
            options={subjects}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        </div>
        <br />
        <h3>Availability:</h3>
        <div className='tutorForm-availability'>
          <div className='tutorForm-availability-select'>
            <SelectField
              options={days}
              label="Select Day: "
              setValue={setDay}
              value={day}
              optionLabelKey='label'
              optionValueKey='value'
            />
            <TimeFrame
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          </div>
          <button className='createAccount' onClick={addAvailability}>
            Add Availability
          </button>
          <AvailabilityList availability={availability} removeAvailability={removeAvailability} />
        </div>
      </>
    );
  }
};

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

    //perhaps navigate to the login page?
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

        <TutorForm accountType={accountType} />
        <br />
        <button className='createAccount' id='register' style={{marginBottom: '2rem'}} onClick={onRegister}>Register</button>
      </div>
    )
  }
};