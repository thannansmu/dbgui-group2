import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './CalendarView.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';
import { availabilityApi } from '../../Api/availabilityApi';
import { getAvailabilities } from '../../Api/availabilityApi';
import { addAvailability } from '../../Api/availabilityApi';
import { getTutorID } from '../../Api/availabilityApi';
import { addTutoringSession } from '../../Api/availabilityApi';
import { getStudentIDByUsername } from '../../Api';

export const CalendarView = ({loggedInUser}) => {

    console.log(loggedInUser);

    //username of tutor
    const {username} = useParams();

    const navigate = useNavigate();

    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [availabilities, setAvailabilities] = useState([]);
    const [tutorID, setTutorID] = useState("");
    const [studentID, setStudentID] = useState("");
    const [bookClicked, setBookClicked] = useState(false);
    
    useEffect(() => {
        const fetchTutorID = async () => {
            try {
                const data = await availabilityApi.getTutorID(username);
                setTutorID(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTutorID();
    }, [username]);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const data = await availabilityApi.getAvailabilities(tutorID);
                setAvailabilities(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (tutorID) {
            fetchAvailabilities();
        }
    }, [tutorID]);

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
    }, [loggedInUser]);

    if (!availabilities && !tutorID && !studentID) {
        return <>
            Loading...
        </>
    }

    console.log("IDs!!");
    console.log(tutorID);
    console.log(studentID)

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hoursOfDay = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'];
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

    const isCellAvailable = (day, time) => {
    
        for (let i = 0; i < availabilities.length; i++) {
        const availability = availabilities[i];
        if (availability.tutorDay === day && availability.tutorTime === time) {
            return true;
        }
        }
        return false;
    };
  
    const renderTableRows = () => {
        return hoursOfDay.map((hour) => {
            return (
                <tr id={hour} key={hour}>
                    <td>{hour}</td>
                    {daysOfWeek.map((day) => {
                        const className = isCellAvailable(day, hour) ? (`${day}-available`) : '';
                        return <td key={day} className={className}></td>
                    })}
                </tr>
            );
        });
    };

    const book = (day, time) => {
        if(isCellAvailable(day, time)) {
            const tutoringSession = {
                studentID: studentID,
                tutorTime: time,
                tutorDay: day
              };
            availabilityApi.addTutoringSession(tutorID, tutoringSession);
            console.log('booked appointment!')
            navigate('/booked-appt');
        }
    };

    return (<>
        <div className='entireCalendar'>
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        {daysOfWeek.map((day) => <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
            <div className='bookAppt'>
                <h3>Book Appointment</h3>
                <SelectField
                    options={days}
                    defaultOption="Select Day"
                    setValue={setDay}
                    label='Select Day: '
                    value={day}
                    optionLabelKey='label'
                    optionValueKey='value'
                />
                <SelectField
                    options={hours}
                    defaultOption="Select Time"
                    setValue={setTime}
                    label='Select Time: '
                    value={time}
                    optionLabelKey='label'
                    optionValueKey='value'
                />
                <button className='checkCalendar' onClick={book(day, time)}>Book</button>
            </div>
        </div>
    </>);
};