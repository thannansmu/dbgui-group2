import axios from "axios";

const url = 'http://localhost:8000';

//////////////////////////////////GET ROUTES/////////////////////////////////

export const getTutorID = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/${username}/tutorID`)
        .then(resp => resolve(resp.data[0].tutorID))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

export const getStudentID = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/${username}/studentID`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

export const getAvailabilities = (tutorID) => new Promise((resolve, reject) => {
    axios.get(`${url}/${tutorID}/times_available`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//////////////////////////////////POST ROUTES/////////////////////////////////

export const addAvailability = (username, availability) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/${username}/add_time_available`, availability)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

export const addTutoringSession = (tutorID, tutoringSession) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/${tutorID}/add_tutoring_session`, tutoringSession)
      .then(resp => resolve(resp.data[0].tutorID))
      .catch(error => {
        alert(error);
        reject(error);
      });
  });
  

export const availabilityApi = {
    getAvailabilities,
    addAvailability,
    getTutorID,
    getStudentID,
    addTutoringSession,
};