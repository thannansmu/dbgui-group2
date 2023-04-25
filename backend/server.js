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

//returns usernames from user table
app.get('/usernames', (req, res) => {
  connection.query('SELECT username FROM User', (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
    console.log(rows);
  });
});


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

//Returns student id of a user
app.get(`/:username/studentID`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT studentID FROM Students WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows);
  })
})

//Returns tutor id of a user
app.get(`/:username/tutorID`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT tutorID FROM Tutors WHERE username = '${username}'`, (err, rows, fields) => {
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
  const attribute = req.params.attribute;
  connection.query(`SELECT ${attribute} FROM User WHERE username = '${username}'`, (err, rows, fields) => {
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
    connection.query(`UPDATE User SET ${attribute} = ${updatedValue} WHERE username = '${username}'`, (err, rows, fields) => {
      if (err) throw err
      res.status(200)
      res.send(`Updated ${attribute} for ${username}`)
      console.log(`Updated ${attribute} for ${username} to ${updatedValue}`)
    })
})

//Returns all requests for specific user
app.get(`/users/:username/requests`, (req, res) => {
  const username = req.params.username;;
  connection.query(`SELECT * FROM Requests WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns all comments for specific user
app.get(`/users/:username/comments`, (req, res) => {
  const username = req.params.username;
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

// Deletes questions from the database based on question text
app.delete('/questions/:questionText', (req, res) => {
  const questionText = req.params.questionText;
  const query = `DELETE FROM Question WHERE questionText = '${questionText}'`;

  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting question from database');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Question not found');
    } else {
      res.status(200).send('Question deleted successfully');
    }
  });
});

//Adds report to database
app.post(`/users/:username/add_report`, (req, res) => {
  const username = req.params.username;
  const adminID = req.body.adminID;
  const report = req.body.report;
  const query = `INSERT INTO Report (username, adminID, report) VALUES ('${username}', null, '${report}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added Report!")
    console.log(`Added report for ${username}\n adminID = ${adminID} request = ${report}`)  
  })
})

//Adds favorite tutor to database
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

//Adds review to database
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

//Adds questions to database
app.post(`/users/:username/add_question`, (req, res) => {
  const username = req.params.username;
  const {studentID, tutorID, question, answer} = req.body
  const query = `INSERT INTO Question (studentID, tutorID, questionText, answer) VALUES (${studentID}, '${tutorID}', '${question}', '${answer}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added review!")
  })
})

//Adds rating to database
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

//Adds time available to database
app.post(`/users/:tutorID/add_time_available`, (req, res) => {
  const tutorID = req.params.tutorID;
  const {tutorTime, tutorDay} = req.body
  const query = `INSERT INTO TimesAvailable (tutorID, tutorTime, tutorDay) VALUES (${tutorID}, '${tutorTime}', ${tutorDay})`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added time!")
  })
})

//Adds tutoring sesison to database
app.post(`/users/:tutorID/add_tutoring_session`, (req, res) => {
  const tutorID = req.params.tutorID;
  const {studentID, tutorTime, tutorDay} = req.body
  const query = `INSERT INTO TutoringSessions(studentID, tutorID, tutorTime, tutorDay) VALUES (${studentID}, ${tutorID}, '${tutorTime}', '${tutorDay}')`
  connection.query(query, (err, rows, fields) => {
    if (err) throw err
    
    console.log(rows)
    res.status(200)
    res.send("Successfully added session!")
  })
})

//Adds subject taught to database
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

//Returns the report content for a user given
app.get(`/:username/reports`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT report FROM Report WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns usernames reported. 
app.get(`/reports`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT username FROM Report`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns favorite tutors for user
app.get(`/:username/favoritetutors`, (req, res) => {
  const username = req.params.username;
  connection.query(`SELECT * FROM FavoriteTutors WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  }) 
})

//Returns reviews for user
app.get(`/:username/reviews`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM Reviews WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  }) 
})

//Returns questions for student
app.get(`/student/:studentID/questions`, (req, res) => {
  const studentID = req.params.studentID;
  connection.query(`SELECT * FROM Question WHERE studentID = ${studentID}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns questions for tutor
app.get(`tutor/:tutorID/questions`, (req, res) => {
  const tutorID = req.params.tutorID;
  connection.query(`SELECT * FROM Question WHERE tutorID = ${tutorID}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//returns all questions
app.get('/questions', (req, res) => {
  connection.query('SELECT questionText, studentID FROM Question', (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(rows);
    console.log(rows);
  });
});


//Returns ratings for user
app.get(`/:username/ratings`, (req, res) => {
  const username = req.params.username;
  
  connection.query(`SELECT * FROM Ratings WHERE username = '${username}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  }) 
})

//get average rating of specific tutor
app.get('/ratings/:tutorID/average', (req, res) => {
  const tutorID = req.params.tutorID;
  connection.query(`SELECT AVG(rating) AS rating FROM Ratings WHERE tutorID = '${tutorID}'`, (err, rows, fields) => {
    if (err) throw err;
    res.status(200)
    res.send(rows)
    console.log(rows)
  });
});


//Returns times available for tutor
app.get(`/:tutorID/times_available`, (req, res) => {
  const tutorID = req.params.tutorID;
  
  connection.query(`SELECT * FROM TimesAvailable WHERE tutorID = ${tutorID}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns tutoring sessions for tutor
app.get(`/:tutorID/tutoring_sessions`, (req, res) => {
  const tutorID = req.params.tutorID;
  
  connection.query(`SELECT * FROM TutoringSessions WHERE tutorID = '${tutorID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})

//Returns subjects taught for tutor
app.get(`/:tutorID/subjects_taught`, (req, res) => {
  const tutorID = req.params.tutorID;
 
  connection.query(`SELECT subject FROM SubjectsTaught WHERE tutorID = '${tutorID}'`, (err, rows, fields) => {
    if (err) throw err
    res.status(200)
    res.send(rows)
    console.log(rows)
  })
})
//Returns all unique subjects taught from the SubjectsTaught table
app.get('/subjects', (req, res) => {
  const query = 'SELECT DISTINCT subject FROM SubjectsTaught';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving subjects from database');
    } else {
      const subjects = results.map(result => result.subject);
      res.status(200).send(subjects);
    }
  });
});



//NOT WORKING HELP
//Adds answer to given question given the questionText
// Adds answer to given question given the questionText
app.put('questions/:questionText/update_answer', (req, res) => {
  const questionText = req.params.questionText;
  const updatedValue = req.body.answer;
  connection.query(`UPDATE Question SET answer = '${updatedValue}' WHERE questionID = '${questionText}'`, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send(`Updated answer for question '${questionText}'`);
    console.log(`Updated answer for '${questionText}' to '${updatedValue}'`);
  });
});


