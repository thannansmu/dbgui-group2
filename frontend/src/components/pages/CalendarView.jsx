import React, { useState } from 'react';
import './CalendarView.css';
import { TextField, TextAreaField, CheckboxList, SelectField, TimeFrame } from '../common';

export const CalendarView = () => {
    
    const availability = [
        {
            availableTime: [
                {day: 'monday', startTime: '08:30', endTime: '12:00'}
            ]
        },
        {
            availableTime: [
                {day: 'tuesday', startTime: '10:00', endTime: '13:00'}
            ]
        },
        {
            availableTime: [
                {day: 'thursday', startTime: '14:00', endTime: '15:00'}
            ]
        }
    ];

    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const hoursOfDay = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30'];
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
    
    return (<>
        <div>
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
            <h3>Availability</h3>
          <SelectField
            options={days}
            defaultOption="Select Day"
            setValue={setDay}
            value={day}
          />
          <TimeFrame
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
    </>);
};
