import axios from "axios";

const url = 'http://localhost:8000';


//Login Route
export const LoginCheck = (username, password) => new Promise((resolve, reject) => {
    axios.post(`${url}/users`, {'usernaem':username, 'password':password})
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