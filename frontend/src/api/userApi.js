import axios from "axios";

const url = 'http://localhost:8000';


//Login Route
export const getUserById = (username, password) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/${username, password}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Register Route
export const addUser = (user) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}`, user)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});