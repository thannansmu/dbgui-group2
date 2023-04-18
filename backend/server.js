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

//Adds comment to specific user
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

//Deletes user from database
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

//Deletes request from database
app.delete(`/delete_request/:requestID`, (req, res) => {
  const requestID = req.params.requestID;
  connection.query(`DELETE FROM Requests WHERE requestID='${requestID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(`Deleted request with requestID ${requestID} from database`)
  })
  
})

//Deletes comments from database
app.delete(`/delete_comment/:commentID`, (req, res) => {
  const commentID = req.params.commentID;
  connection.query(`DELETE FROM Comments WHERE commentID='${commentID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(`Deleted request with commentID ${commentID} from database`)
  })
  
})

