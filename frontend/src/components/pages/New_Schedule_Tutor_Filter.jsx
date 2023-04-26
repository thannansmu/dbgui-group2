import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { getTutors } from '../../Api/tutorApi';
import { getTutorRating } from '../../Api';
import { availabilityApi } from '../../Api/availabilityApi';
import { getTutorID } from '../../Api/availabilityApi';
import { getUserByAttribute } from '../../Api';
import { getTutorSubjectsTaught } from '../../Api';
import { useCallback } from 'react';

const TutorCard = (tutor, tutorsList) => {
    
};

export const New_Schedule_Tutor_Filter = () => {
    const [tutors, setTutors] = useState([]);
    const [tutorList, setTutorList] = useState([]);

    useEffect(() => {
        const fetchTutors = async () => {
            const data = await getTutors();
            setTutors(data);
        };

        fetchTutors();
    }, []);

    useEffect(() => {
        const makeTutorList = async () => {
            const list = [];
            for (const tutor of tutors) {
                const firstName = await getUserByAttribute(tutor.username, 'firstName');
                const lastName = await getUserByAttribute(tutor.username, 'lastName');
                list.push({
                    username: tutor.username,
                    tutorID: tutor.tutorID,
                    tutorFirstName: firstName[0].firstName,
                    tutorLastName: lastName[0].lastName,
                });
            }
            setTutorList(list);
        };

        if (tutors.length > 0) {
            makeTutorList();
        }
    }, [tutors]);

    console.log(tutorList)

    return <>
    </>
};