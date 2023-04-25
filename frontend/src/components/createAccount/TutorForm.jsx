import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateAccountForm.css';
import { CheckboxList, SelectField } from '../common';
import { AvailabilityList, CreateAccountForm } from '../createAccount';
import { addUser } from '../../Api';
import { Link } from 'react-router-dom';
import { availabilityApi } from '../../Api/availabilityApi';
import { getTutorID } from '../../Api/availabilityApi';
import { addTutorAvailability} from '../../Api';
import { addSubjectTaught } from '../../Api';

export const TutorForm = () => {

    const { username } = useParams();

    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [checkedItems, setCheckedItems] = useState({});
    const [availability, setAvailability] = useState([]);
    const [tutorID, setTutorID] = useState([]);
    const [availabilitiesApi, setAvailabilitiesApi] = useState([]);

    useEffect(() => {
        availabilityApi.getTutorID(username)
        .then(data => setTutorID(data))
        .catch(error => console.log(error));
    }, []);

    if(!tutorID) {
        return <>
            Loading...
        </>
    }

    console.log(checkedItems)

    const addAvailability = () => {

        if (day && time) {
            const newAvailableTime = (
                <div key={availability.length}>
                    <div className="availableTime">{day}: {time}</div>
                </div>
            );

            const newAvailabilityApi = {
                tutorDay: day,
                tutorTime: time,
            };

            setAvailability([...availability, newAvailableTime]);
            setAvailabilitiesApi([...availabilitiesApi, newAvailabilityApi]);
            setDay('');
            setTime('');
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

    const subjects = [
        { value: 1, name: "Math" },
        { value: 2, name: "Science" },
        { value: 3, name: "Writing" },
        { value: 4, name: "History" },
        { value: 5, name: "Computer Science"},
        { value: 6, name: "Business"}
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
        { value: '06:00', label: '06:00' },
        { value: '07:00', label: '07:00' },
        { value: '08:00', label: '08:00' },
        { value: '09:00', label: '09:00' },
        { value: '10:00', label: '10:00' },
        { value: '11:00', label: '11:00' },
        { value: '12:00', label: '12:00' },
        { value: '13:00', label: '13:00' },
        { value: '14:00', label: '14:00' },
        { value: '15:00', label: '15:00' },
        { value: '16:00', label: '16:00' },
        { value: '17:00', label: '17:00' },
        { value: '18:00', label: '18:00' },
        { value: '19:00', label: '19:00' },
        { value: '20:00', label: '20:00' },
        { value: '21:00', label: '21:00' },
        { value: '22:00', label: '22:00' },
        { value: '23:00', label: '23:00' },
        { value: '00:00', label: '00:00' },
        { value: '01:00', label: '01:00' },
        { value: '02:00', label: '02:00' },
        { value: '03:00', label: '03:00' },
        { value: '04:00', label: '04:00' },
        { value: '05:00', label: '05:00' },
    ];
 
    const onRegister = async () => {
        availabilitiesApi.map(availability => {
            const newAvailability = {
                tutorDay: "'" + availability.tutorDay + "'",
                tutorTime: availability.tutorTime,
            };
            
            addTutorAvailability(tutorID, newAvailability);
        })

        if(checkedItems.Math) {
            console.log('math checked');
            addSubjectTaught(username, tutorID, "Math");
        }
        if(checkedItems.Science) {
            console.log('science checked');
            addSubjectTaught(username, tutorID, "Science");
        }
        if(checkedItems.Writing) {
            console.log('writing checked');
            addSubjectTaught(username, tutorID, "Writing");
        }
        if(checkedItems.History) {
            console.log('history checked');
            addSubjectTaught(username, tutorID, "History");
        }
        if(checkedItems["Computer Science"]) {
            console.log('comp sci checked');
            addSubjectTaught(username, tutorID, "Computer Science");
        }
        if(checkedItems.Business) {
            console.log('business checked');
            addSubjectTaught(username, tutorID, "Business");
        }

    };

    return <>
    <div className = 'createAccountForm'>
        <h2>Subjects Taught:</h2>
        <div className='tutorForm-checkbox'>
            <CheckboxList
                options={subjects}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
            />
        </div>
        <br />
        <h2>Availability:</h2>
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
                    defaultOption="Select Time"
                    setValue={setTime}
                    label='Select Time: '
                    value={time}
                    optionLabelKey='label'
                    optionValueKey='value'
                />
            </div>
            <button className='createAccount' onClick={addAvailability}>
                Add Availability
            </button>
            <AvailabilityList availability={availability} removeAvailability={removeAvailability} />
        </div>
        <br />
        <Link to='/login'><button className='createAccount' onClick={onRegister}>
            Create Tutor Account
        </button></Link>
    </div>
    </>
};
