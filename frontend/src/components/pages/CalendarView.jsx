import React, { useState, useEffect } from 'react';
import './CalendarView.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';
import { availabilityApi, getAvailabilities, addAvailability } from '../../api';
import { userApi, getUser } from '../../api';
export const CalendarView = () => {

    const availability = [
        {
            availableTime: [
                { day: 'monday', startTime: '08:30', endTime: '12:00' }
            ]
        },
        {
            availableTime: [
                { day: 'tuesday', startTime: '10:00', endTime: '13:00' }
            ]
        },
        {
            availableTime: [
                { day: 'thursday', startTime: '14:00', endTime: '15:00' }
            ]
        }
    ];

    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [availabilities, setAvailabilities] = useState([]);

    const testAvailability = [{
        tutorId: 1,
        tutorTime: 2,
        tutorDay: 'Monday'
    }];

    useEffect(() => {
        availabilityApi.addAvailability('user6', testAvailability)
        .then(setAvailabilities([...availabilities, testAvailability]))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        availabilityApi.getAvailabilities('user6')
        .then(data => setAvailabilities(data))
        .catch(error => console.log(error));
    }, []);

    if (!availabilities) {
        return <>
            Loading...
        </>
    }

console.log(availabilities);

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
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
    const isCellAvailable = (day, time) => {
        for (let i = 0; i < availability.length; i++) {
            const availableTime = availability[i].availableTime[0];
            if (availableTime.day === day && availableTime.startTime <= time && availableTime.endTime > time) {
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
/*
    const book = () => {
        if (!(day && startTime && endTime)) {
            setDay('');
            setEndTime('');
            setStartTime('');
        }
        for (var k=(startTime%100); k<)
    };

*/

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
                <TimeFrame
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <button className='calendar'>Book</button>
            </div>
        </div>
    </>);
};
