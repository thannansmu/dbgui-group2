import React from "react";
import './CalendarView.css';

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
    
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const hoursOfDay = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

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
                        const className = isCellAvailable(day, hour) ? (`${day}-green`) : '';
                        return <td key={day} className={className}></td>
                    })}
                </tr>
            );
        });
    };
    
    return (
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
        </div>
    );
};