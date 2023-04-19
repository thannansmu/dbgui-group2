import axios from "axios";

const url = 'http://localhost:8000';

//////////////////////////////////GET ROUTES/////////////////////////////////

export const getAvailabilities = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}/times_available`)
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

export const availabilityApi = {
    getAvailabilities,
    addAvailability,
};