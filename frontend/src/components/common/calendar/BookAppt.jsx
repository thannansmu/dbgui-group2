import React, { useState, useEffect } from 'react';
import { availabilityApi } from '../../../Api/availabilityApi';
import { getStudentIDByUsername } from '../../../Api';

export const BookAppt = (day, time, loggedInUser, tutorUsername) => {

    const [availabilities, setAvailabilities] = useState([]);
    const [tutorID, setTutorID] = useState("");
    const [studentID, setStudentID] = useState("");

    useEffect(() => {
        const fetchTutorID = async () => {
            try {
                const data = await availabilityApi.getTutorID(tutorUsername);
                setTutorID(data[0].tutorID);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTutorID();
    }, [tutorUsername]);

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

    if(!availabilities) {
        return <>
            Loading...
        </>
    }

    const hoursOfDay = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'];

    const currentIndex = hoursOfDay.indexOf(time);
    var endTime = hoursOfDay[currentIndex + 1];
    if (currentIndex + 1 === hoursOfDay.length) {
        endTime = '6:00';
    }

    for (let i = 0; i < availabilities.length; i++) {
        const availability = availabilities[i];
        if (availability.tutorDay === day && availability.tutorTime >= time && availability.tutorTime < endTime) {
            //if time available
            const tutoringSession = {
                studentID: studentID,
                tutorTime: time,
                tutorDay: day
              };
            availabilityApi.addTutoringSession(tutorID, tutoringSession);
            console.log('booked appointment!');

            return <>
                <p>booked!</p>
            </>
        }
    }
    return <>
        <p>no availability!</p>
    </>;
};
