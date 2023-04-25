import React, { useState, useEffect } from 'react';

const AppointmentList = (tutorID, studentID, time, day) => {

};

export const YourAppointments = ({loggedInUser}) => {

  const [bookedAppts, setBookedAppts] = useState([]);

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
            <th style={{ width: '30%', fontWeight: 'bold', textDecoration: 'underline' }}>Time</th>
            <th style={{ width: '40%', fontWeight: 'bold', textDecoration: 'underline' }}>Tutor</th>
          </tr>
        </thead>
        <tbody>
          {bookedAppts.map((appt) => (
            <AppointmentList tutorID={appt.tutorID} name={appt.studentID} time={appt.time} day={appt.day} />
          ))}
        </tbody>
      </table>
    </div>
  );
};