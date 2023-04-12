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
  database: 'DBUI'
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

app.get(`/users/${username}`, (req, res) => {
  const username = req.body;
  connection.query(`SELECT * FROM User WHERE username = ${username}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
  })
})

app.get(`/users/${username}/${attribute}`, (req, res, username, attribute) => {
    
})

app.post('/users/add', (req, res) => {
    const {user, first, last, pwd, biog, userRle} = req.body
    const query = `INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('${user}', '${first}', '${last}', '${pwd}', '${biog}', '${userRle}')`
    connection.query(query, (err, rows, fields) => {
      if (err) throw err
      
      console.log(rows)
      res.status(200)
      res.send("Successfully added user!")
    })
})

app.put(`/users/${username}/${attribute}/update`, (req, res) => {
    
})

app.get(`/users/${username}/requests`, (req, res) => {
    
})

app.get(`/users/${username}/comments`, (req, res) => {
    
})

app.post(`/users/${username}/add_request`, (req, res) => {
    
})

app.post(`/users/${username}/add_comment`, (req, res) => {
    
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















