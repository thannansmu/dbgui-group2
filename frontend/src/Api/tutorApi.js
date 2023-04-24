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

//Get Tutor
export const getTutor = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

export const getTutorTimesAvailable = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}/timesAvailable`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});


// Get subjects taught by a tutor
export const getTutorSubjectsTaught = (tutorID) => new Promise((resolve, reject) => {
    axios.get(`${url}/${tutorID}/subjects_taught`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});


export const getTutorID = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/${username}/tutorID`)
      .then(resp => resolve(resp.data))
      .catch(error => {
        alert(error);
        reject(error);
      });
  });
  
  //return the tutor's ratings. 
export const getTutorRating = (tutorID) => new Promise((resolve, reject) => {
    axios.get(`${url}/ratings/${tutorID}/average`)
    .then(resp => resolve(resp.data))
    .catch(error => {
        alert(error);
        reject(error);
    });
});


///////////////////////////////END OF GET ROUTES/////////////////////////////



////////////////////////////////POST ROUTES//////////////////////////////////
//Register
export const addTutor = (user) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/add`, user)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

export const addTutorAvailability = (tutorID, availability) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/${tutorID}/add_time_available`, availability)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//////////////////////////////END OF POST ROUTES/////////////////////////////



//////////////////////////////////PUT ROUTES/////////////////////////////////
//Update Profile
export const updateTutor = (username, attribute, updatedValue) => new Promise((resolve, reject) => {
    axios.put(`${url}/${username}/${attribute}/update`, updatedValue)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

///////////////////////////////END OF PUT ROUTES/////////////////////////////



///////////////////////////////DELETE ROUTES/////////////////////////////////
//Delete User
export const deleteTutor = (username) => new Promise((resolve, reject) => {
    axios.delete(`${url}/${username}/delete`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

////////////////////////////END OF DELETE ROUTES/////////////////////////////