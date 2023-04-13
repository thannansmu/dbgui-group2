const express = require('express')
const app = express()
const port = 8000
const id = 0

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
  database: 'tutoringTables'
})

connection.connect()

// API routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/users', (req, res) => {
  connection.query(`SELECT * FROM User`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.get(`/users/:username`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT * FROM User WHERE username = ${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.get(`/users/:username/:attribute`, (req, res) => {
  const username = req.params.username;
  const attribite = req.params.attribute;
  connection.query(`SELECT ${attribite} FROM User WHERE username = ${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
    
})

app.post('/users/add', (req, res) => {
    const {user, first, last, pwd, biog, userRole} = req.body
    const query = `INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('${user}', '${first}', '${last}', '${pwd}', '${biog}', '${userRole}')`
    connection.query(query, (err, rows, fields) => {
      if (err) throw err
      
      console.log(rows)
      res.status(200)
      res.send("Successfully added user!")
    })
})

app.put(`/users/:username/:attribute/update`, (req, res) => {
    const username = req.params.username;
    const attribute = req.params.attribute;
    const updatedValue = req.body;  
    connection.query(`UPDATE users SET ${attribute} = ${updatedValue} WHERE username = ${username}`, (err, rows, fields) => {
      if (err) throw err
      res.status(200)
      res.send(`Updated ${attribute} for ${username}`)
    })
})

app.get(`/users/:username/requests`, (req, res) => {
  const username = req.params.username;;
  connection.query(`SELECT * FROM Requests WHERE username = ${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.get(`/users/:username/comments`, (req, res) => {
  const username = req.params.username;;
  connection.query(`SELECT * FROM Comments WHERE username = ${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.post(`/users/:username/add_request`, (req, res) => {
  const {requestID, studentID, tutorID, request} = req.body
  const query = `INSERT INTO Requests (requestID, studentID, tutorID, request) VALUES ('${requestID}', '${studentID}', '${tutorID}', '${request}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added Request!")
  })
   
})

app.post(`/users/:username/add_comment`, (req, res) => {
    
})

app.delete(`/users/:username/delete`, (req, res) => {
  const username = req.params.username;;
  connection.query(`DELETE FROM User WHERE username=${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.delete(`/delete_request/:requestID`, (req, res) => {
<<<<<<< HEAD
  const username = req.params.username;;
  connection.query(`DELETE FROM Requests WHERE requesrID=${requestID}`, (err, rows, fields) => {
=======
  const rID = req.params.requestID;;
  connection.query(`DELETE FROM Requests WHERE requestID=${rID}`, (err, rows, fields) => {
>>>>>>> ad9e993f17ccba2d0f2676cab1fbb55fecd4cb9a
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
<<<<<<< HEAD
  
})

app.delete(`/delete_comment/:commentID`, (req, res) => {
  const username = req.params.username;;
  connection.query(`DELETE FROM Comments WHERE commentID=${commentID}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
  
=======
})

app.delete(`/delete_comment/:commentID`, (req, res) => {
  const cID = req.params.commentID;;
  connection.query(`DELETE FROM Comments WHERE commentID=${cID}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)    
  })
>>>>>>> ad9e993f17ccba2d0f2676cab1fbb55fecd4cb9a
})








//Old Stuff
// app.put('/parse', (req, res) => {
//     console.log(req.body)
    
//     try {
//         const { first, last, age, admin } = req.body
//         const name = `${first} ${last}`
//         const isAdmin = admin ? "is an admin" : "is not an admin"

//         res.status(200)
//         res.send(`${name} is ${age} years old and ${isAdmin}`)
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.get('/db', (req, res) => {
//     connection.query('SHOW TABLES', (err, rows, fields) =>{
//         if (err) throw err

//         console.log(rows)
//         res.status(200)
//         res.send(rows)
//     })
// })

// app.post('/user', (req, res) => {
//     const { first, last, age, admin } = req.body
//     const query = `INSERT INTO users (first_name, last_name, age, admin) VALUES ('${first}', '${last}', ${age}, ${admin})`
//     connection.query(query, (err, rows, fields) => {
//         if (err) throw err

//         console.log(rows)
//         res.status(200)
//         res.send("Successfully added user!")
//     })
// })

// app.get('/users', (req, res) => {
//     connection.query(`SELECT * FROM users`, (err, rows, fields) => {
//         if (err) throw err

//         res.status(200)
//         res.send(rows)
//     })
// })

// app.put('/users/clear', (req, res) => {
//     connection.query(`DELETE FROM users`, (err, rows, fields) => {
//         if (err) throw err

//         res.status(200)
//         res.send("Successfully cleared users!")
//     })
// })















