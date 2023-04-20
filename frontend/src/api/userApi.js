import axios from "axios";

const url = 'http://localhost:8000';


//////////////////////////////////GET ROUTES/////////////////////////////////
//Login
export const LoginCheck = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get Users
export const getUsers = () => new Promise((resolve, reject) => {
    axios.get(`${url}/users`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get User
export const getUser = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get User's specific attribute
export const getUserByAttribute = (username, attribute) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}/${attribute}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get User Requests
export const getUserRequests = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}/requests`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Get User Comments
export const getUserComments = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/users/${username}/comments`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});
//Get StudentID by username
export const getStudentIDByUsername = (username) => new Promise((resolve, reject) => {
    axios.get(`${url}/${username}/info`)
        .then(resp => {
            const studentID = resp.data[0].studentID;
            resolve(studentID);
        })
        .catch(error => {
            alert(error);
            reject(error);
        });
});


//Returns the first question of a particular Student
export const getQuestionTextByStudentID = (studentID) => new Promise((resolve, reject) => {
    axios.get(`${url}/student/${studentID}/questions`)
        .then(resp => {
            const questions = resp.data;
            if (questions.length > 0) {
                const questionText = questions[0].questionText;
                resolve(questionText);
            } else {
                reject(new Error(`No question found for student ID ${studentID}`));
            }
        })
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Returns all questions associated with student:
export const getQuestionTextsByStudentID = (studentID) => new Promise((resolve, reject) => {
    axios.get(`${url}/student/${studentID}/questions`)
        .then(resp => {
            const questions = resp.data;
            if (questions.length > 0) {
                const questionTexts = questions.map(question => question.questionText);
                resolve(questionTexts);
            } else {
                reject(new Error(`No questions found for student ID ${studentID}`));
            }
        })
        .catch(error => {
            alert(error);
            reject(error);
        });
});


///////////////////////////////END OF GET ROUTES/////////////////////////////



////////////////////////////////POST ROUTES//////////////////////////////////
//Register
export const addUser = (user) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/add`, user)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Add New Request
export const addRequest = (username, request) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/${username}/add_request`, request)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Add New Comment
export const addComment = (username, comment) => new Promise((resolve, reject) => {
    axios.post(`${url}/users/${username}/add_comment`, comment)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//////////////////////////////END OF POST ROUTES/////////////////////////////



//////////////////////////////////PUT ROUTES/////////////////////////////////
//Update Profile
export const updateUser = (username, attribute, updatedValue) => new Promise((resolve, reject) => {
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
export const deleteUser = (username) => new Promise((resolve, reject) => {
    axios.delete(`${url}/${username}/delete`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Delete Request
export const deleteRequest = (id) => new Promise((resolve, reject) => {
    axios.delete(`${url}/requests/delete_request/${id}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});

//Delete Comment
export const deleteCommentt = (id) => new Promise((resolve, reject) => {
    axios.delete(`${url}/comments/delete_comment/${id}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        });
});
////////////////////////////END OF DELETE ROUTES/////////////////////////////