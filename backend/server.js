const express = require('express')
const app = express()
const port = 8000

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())

// Connect to mysql
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CoolPasswordThanks',
  database: 'tutoringTables',
  multipleStatements: true
})

connection.connect()

// Test API
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Returns all users in database
app.get('/users', (req, res) => {
  connection.query(`SELECT * FROM User`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns all students in database
app.get(`/students`, (req, res) => {
  connection.query(`SELECT * FROM Students`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns all tutors in database
app.get(`/tutors`, (req, res) => {
  connection.query(`SELECT * FROM Tutors`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns all info for specific user
app.get(`/users/:username`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT * FROM User WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows);
  })
})

//Returns all info for specific student
app.get(`/:studentID/info`, (req, res) => {
  const studentID = req.params.tutorID;
  connection.query(`SELECT * FROM Students WHERE studentID = '${studentID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns all info for specific tutor
app.get(`/:tutorID/info`, (req, res) => {
  const tutorID = req.params.tutorID;
  connection.query(`SELECT * FROM Tutors WHERE tutorID = '${tutorID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns specific attribute value from specific user
app.get(`/users/:username/:attribute`, (req, res) => {
  const username = req.params.username;
  const attribite = req.params.attribute;
  connection.query(`SELECT ${attribite} FROM User WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Adds user to database
app.post('/users/add', (req, res) => {
    const {username, firstName, lastName, passWord, bio, userRole} = req.body
    const query = `INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('${username}', '${firstName}', '${lastName}', '${passWord}', '${bio}', '${userRole}'); `;

    let query2 = "";
    if (userRole.toLowerCase() == "student") {
      query2 += `INSERT INTO Students (username) VALUES ('${username}')`
    }

    else if (userRole.toLowerCase() == "tutor") {
      query2 += `INSERT INTO Tutors (username) VALUES ('${username}')`
    }

    else if (userRole.toLowerCase() == "admin") {
      query2 += `INSERT INTO Administration (username) VALUES ('${username}')`
    }

    connection.query(query + query2, (err, rows, fields) => {
      if (err) throw err
      res.status(200)
      res.send("Successfully added user!")
      console.log(`Inserted user into database\nusername = ${username}, firstName = ${firstName}, lastName = ${lastName}, password = ${passWord}, bio = ${bio}, userRole = ${userRole}`);
    })
})

//Updates the value of an atribute for specific user
app.put(`/users/:username/:attribute/update`, (req, res) => {
    const username = req.params.username;
    const attribute = req.params.attribute;
    const updatedValue = req.body;  
    connection.query(`UPDATE users SET ${attribute} = ${updatedValue} WHERE username = '${username}'`, (err, rows, fields) => {
      if (err) throw err
      res.status(200)
      res.send(`Updated ${attribute} for ${username}`)
      console.log(`Updated ${attribute} for ${username} to ${updatedValue}`)
    })
})

//Gets all requests for specific user
app.get(`/users/:username/requests`, (req, res) => {
  const username = req.params.username;;
  connection.query(`SELECT * FROM Requests WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Gets all comments for specific user
app.get(`/users/:username/comments`, (req, res) => {
  const username = req.params.username;;
  connection.query(`SELECT * FROM Comments WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Addes request to specific user
app.post(`/users/:username/add_request`, (req, res) => {
  const username = req.params.username;
  const {requestID, studentID, tutorID, request} = req.body
  const query = `INSERT INTO Requests (requestID, username, studentID, tutorID, request) VALUES (${requestID},'${username}', ${studentID}, ${tutorID}, '${request}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added Request!")
    console.log(`Added request for ${username}\nrequestID = ${requestID} studentID = ${studentID} tutorID = ${tutorID} request = ${request}`)
  })
})

app.post(`/users/:username/add_comment`, (req, res) => {
  const username = req.params.username;
  const {commentID, commentRecieverID, comment} = req.body
  const query = `INSERT INTO Comments (commentID, username, commentRecieverID, comment) VALUES (${commentID}, '${username}', ${commentRecieverID}, '${comment}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added Comment!")
    console.log(`Added request for ${username}\ncommentID = ${commentID} commentRecieverID = ${commentRecieverID} comment = ${comment}`)
  })
})

app.delete(`/users/:username/delete`, (req, res) => {
  const username = req.params.username;
  console.log(`DELETE FROM User WHERE username='${username}'`);
  connection.query(`DELETE FROM User WHERE username='${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(`Deleted user ${username} from database`)
  })
})

app.delete(`/requests/delete_request/:requestID`, (req, res) => {
  const requestID = req.params.requestID;
  connection.query(`DELETE FROM Requests WHERE requestID='${requestID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(`Deleted request with requestID ${requestID} from database`)
  })
  
})

app.delete(`/comments/delete_comment/:commentID`, (req, res) => {
  const commentID = req.params.commentID;
  connection.query(`DELETE FROM Comments WHERE commentID='${commentID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(`Deleted request with commentID ${commentID} from database`)
  })
})


app.post(`/users/:username/add_report`, (req, res) => {
  const username = req.params.username;
  const {adminID, report} = req.body
  const query = `INSERT INTO Report (username, adminID, report) VALUES ('${username}', ${adminID}, '${report}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added Report!")
    console.log(`Added report for ${username}\n adminID = ${adminID} request = ${report}`)  
  })
})

app.post(`/users/:username/add_favoritetutor`, (req, res) => {
  const username = req.params.username;
  const {studentID, tutorID} = req.body
  const query = `INSERT INTO FavoriteTutors (username, studentID, tutorID) VALUES ('${username}', ${studentID}, '${tutorID}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added favorite tutor!")
  })
})

app.post(`/users/:username/add_review`, (req, res) => {
  const username = req.params.username;
  const {studentID, tutorID, review} = req.body
  const query = `INSERT INTO Reviews (username, studentID, tutorID, review) VALUES ('${username}', ${studentID}, '${tutorID}', '${review}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added review!")
  })
  
})

app.post(`/users/:username/add_rating`, (req, res) => {
  const username = req.params.username;
  const {studentID, tutorID, rating} = req.body
  const query = `INSERT INTO Ratings (username, studentID, tutorID, rating) VALUES ('${username}', ${studentID}, '${tutorID}', '${rating}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added rating!")
  })
})

app.post(`/users/:username/add_time_avaliable`, (req, res) => {
  const username = req.params.username;
  const {tutorID, tutorTime, tutorDay} = req.body
  const query = `INSERT INTO TimesAvaliable (tutorID, tutorTime, tutorDay) VALUES (${tutorID}, '${tutorTime}', ${tutorDay})`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added time!")
  })
})

app.post(`/users/:username/add_tutoring_session`, (req, res) => {
  const username = req.params.username;
  const {tutorID, tutorSession} = req.body
  const query = `INSERT INTO TutoringSessions (tutorID, tutorSession) VALUES (${tutorID}, '${tutorSession}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added session!")
  })
})

app.post(`/users/:username/add_subject_taught`, (req, res) => {
  const username = req.params.username;
  const {tutorID, subject} = req.body
  const query = `INSERT INTO SubjectsTaught (tutorID, subject) VALUES (${tutorID}, '${subject}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added subject!")
  })
})

app.get(`/users/:username/reports`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM Report WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
})

app.get(`/users/:username/favoritetutors`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT * FROM FavoriteTutors WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
  
})

app.get(`/users/:username/reviews`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM Reviews WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
  
})

app.get(`/users/:username/ratings`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM Ratings WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
  
})

app.get(`/users/:username/times_avaliable`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM TimesAvailable WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
  
})

app.get(`/users/:username/tutoring_sessions`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM TutoringSessions WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
  
})

app.get(`/users/:username/subjects_taught`, (req, res) => {
  const username = req.params.username;
 
  connection.query(`SELECT * FROM SubjectsTaught WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
})
})


