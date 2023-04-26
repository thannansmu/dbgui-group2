import React, { useState } from 'react';
import './CreateAccountForm.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';
import { AvailabilityList } from '../createAccount';
import { addUser } from '../../Api';
import { Link } from 'react-router-dom';
import { addTutorAvailability } from '../../Api';

const TutorForm = ({ accountType }) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [checkedItems, setCheckedItems] = useState("");
  const [availability, setAvailability] = useState([]);

  //use state to be sent to the api
  const [availabilitiesApi, setAvailabilitiesApi] = useState([]);

  const addAvailability = () => {

    if (day && startTime && endTime) {

      const newAvailableTime = (
        <div key={availability.length}>
          <div className="availableTime">{day}: {startTime} - {endTime}</div>
        </div>
      );

      const newAvailabilityApi = {
        startTime: startTime,
        endTime: endTime,
        tutorDay: day
      };

      setAvailability([...availability, newAvailableTime]);
      setAvailabilitiesApi([...availabilitiesApi, newAvailabilityApi]);
      setDay('');
      setStartTime('');
      setEndTime('');
    };
  };

  const removeAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability.splice(index, 1);
    setAvailability(newAvailability);

    const newAvailabilitiesApi = [...availabilitiesApi];
    newAvailabilitiesApi.splice(index, 1);
    setAvailabilitiesApi(newAvailabilitiesApi);
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

    const hours = [
      {value: '06:00', label: '06:00'},
      {value: '07:00', label: '07:00'},
      {value: '08:00', label: '08:00'},
      {value: '09:00', label: '09:00'},
      {value: '10:00', label: '10:00'},
      {value: '11:00', label: '11:00'},
      {value: '12:00', label: '12:00'},
      {value: '13:00', label: '13:00'},
      {value: '14:00', label: '14:00'},
      {value: '15:00', label: '15:00'},
      {value: '16:00', label: '16:00'},
      {value: '17:00', label: '17:00'},
      {value: '18:00', label: '18:00'},
      {value: '19:00', label: '19:00'},
      {value: '20:00', label: '20:00'},
      {value: '21:00', label: '21:00'},
      {value: '22:00', label: '22:00'},
      {value: '23:00', label: '23:00'},
      {value: '00:00', label: '00:00'},
      {value: '01:00', label: '01:00'},
      {value: '02:00', label: '02:00'},
      {value: '03:00', label: '03:00'},
      {value: '04:00', label: '04:00'},
      {value: '05:00', label: '05:00'},
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
            <SelectField
              options={hours}
              defaultOption="Select Start Time"
              setValue={setStartTime}
              label='Select Start Time: '
              value={startTime}
              optionLabelKey='label'
              optionValueKey='value'
            />
            <SelectField
              options={hours}
              defaultOption="Select End Time"
              setValue={setEndTime}
              label='Select End Time: '
              value={endTime}
              optionLabelKey='label'
              optionValueKey='value'
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
  };

  if (accountType) {
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
        <Link to='/login'><button className='createAccount' id='register' style={{ marginBottom: '2rem' }} onClick={onRegister}>Register</button></Link>
      </div>
    )
  }
};