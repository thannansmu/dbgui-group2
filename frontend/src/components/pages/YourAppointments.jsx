import React, { useState, useEffect } from 'react';
import { getBookedAppointments, getStudentIDByUsername } from '../../Api';
import { getInfoForTutorID } from '../../Api';
import { getStudentIDByUsername } from '../../Api';

const AppointmentList = (tutorID, time, day) => {
  
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const response = await getInfoForTutorID(tutorID, 'firstName');
    setInfo(response);
  };
  
  console.log(info);

  return <>
    <tr>
      <td>{tutorID}</td>
      <td></td>
    </tr>
  </>
};

export const YourAppointments = ({loggedInUser}) => {

  const [bookedAppts, setBookedAppts] = useState([]);
  const [studentID, setStudentID] = useState('');

  useEffect(() => {
    const fetchStudentID = async () => {
      try {
        const data = await getStudentIDByUsername(loggedInUser);
        setStudentID(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentID();
  }, []);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getBookedAppointments(studentID);
        setBookedAppts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if(studentID)
    fetchAppointments();
  }, [studentID]);

  if(!bookedAppts && !studentID) {
    return <>
      Loading...
    </>
  }

  return (
    <div style={{ position: 'relative' }}>
      <img
        src="/videos/vid_2.gif"
        alt="Your GIF"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: 'auto',
          zIndex: 1
        }}
      />
      <h1>Your Appointments</h1>
      <table style={{ borderSpacing: ' 30px' }}>
        <thead>
          <tr>
            <th style={{ width: '40%', fontWeight: 'bold', textDecoration: 'underline' }}>Tutor</th>
            <th style={{ width: '30%', fontWeight: 'bold', textDecoration: 'underline' }}>Day</th>
            <th style={{ width: '30%', fontWeight: 'bold', textDecoration: 'underline' }}>Time</th>


          </tr>
        </thead>
        <tbody>
          {bookedAppts.map((appt) => (
            <AppointmentList tutorID={appt.tutorID} time={appt.tutorTime} day={appt.tutorDay} />
          ))}
        </tbody>
      </table>
    </div>
  );
};