import axios from "axios";

const url = 'http://localhost:8000';


//////////////////////////////////GET ROUTES/////////////////////////////////
//Get Tutors
export const getTutors = () => new Promise((resolve, reject) => {
    axios.get(`${url}/tutors`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get a Tutor
export const getTutor = (tutorId) => new Promise((resolve, reject) => {
    axios.get(`${url}/${tutorId}/info`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get Tutor Id
export const getTutorId = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/${username}/tutorId`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

///////////////////////////////END OF GET ROUTES/////////////////////////////



////////////////////////////////POST ROUTES//////////////////////////////////


//////////////////////////////END OF POST ROUTES/////////////////////////////



//////////////////////////////////PUT ROUTES/////////////////////////////////


///////////////////////////////END OF PUT ROUTES/////////////////////////////



///////////////////////////////DELETE ROUTES/////////////////////////////////


////////////////////////////END OF DELETE ROUTES/////////////////////////////