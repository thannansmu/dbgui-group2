import { React, useState } from "react";
import axios from "axios";
import './ReviewTutorSearch.css';
import { TextField } from "../common";


export const ReviewTutorSearch = () => {

    //psuedo datasets cause i havent figured out connecting to backend yet
    //just focusing on logic/implementation right now
    const psuedoTutorData = [
        {
            tutor: [
                { name: 'Jimmy', subject: 'Math'}
            ]
        },
        {
            tutor: [
                { name: 'John', subject: 'English'}
            ]
        },
        {
            tutor: [
                { name: 'Jessica', subject: 'Physics'}
            ]
        }
    ];

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [tutors, setTutors] = useState([]);

    const searchButton = () => {
        const newFilteredData = psuedoTutorData.filter(tutor => tutor.tutor[0].name.includes(search))
        setFilteredData(newFilteredData);
        setSearch('');
    };
    
    const addTutor = (tutor) => {
        if (search) {
            const newTutor = (
                <tr>
                   <td>{tutor.name}</td> 
                   <td>{tutor.subject}</td>
                   <td>
                        <button>Rate</button>
                   </td>
                </tr>
            );
            setTutors([...tutors, newTutor]);
        }
    };

    const RenderTutors = ({ tutors }) => {
        if (tutors) {
            if (tutors.length === 0) {
                return <>
                </>
            }
            else {
                return <>
                    {tutors.map((tutor) => tutor)}
                </>
            };
        }
    };

    return <>
        <div className='searchbar'>
            <TextField
                id='searchbar'
                lable="Search Tutor:"
                value={search}
                setValue={setSearch}
            />
            <button onClick={searchButton}>Search</button>
        </div>
        <div className='searchResults'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <RenderTutors tutors={filteredData} />
                </tbody>
            </table>
        </div>
    </>
};