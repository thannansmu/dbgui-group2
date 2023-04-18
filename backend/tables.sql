DROP DATABASE IF EXISTS tutoringTables;

CREATE DATABASE IF NOT EXISTS tutoringTables;

USE tutoringTables;

CREATE Table User (
    username VARCHAR(20),
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    passWord VARCHAR(20),
    bio VARCHAR(500),
    userRole VARCHAR(20),
    PRIMARY KEY (username)
);

CREATE Table Students(
    studentID INT AUTO_INCREMENT,
    username VARCHAR(20),
    PRIMARY KEY (studentID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE Table Tutors (
    tutorID INT AUTO_INCREMENT,
    username VARCHAR(20),
    PRIMARY KEY (tutorID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);


CREATE Table Administration (
    adminID INT AUTO_INCREMENT,
    username VARCHAR(20),
    PRIMARY KEY (adminID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE Table Question (
    questionID INT AUTO_INCREMENT,
    studentID INT,
    tutorID INT,
    questionText VARCHAR(500),
    answer VARCHAR(500),
    PRIMARY KEY (questionID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE,
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE
);

CREATE Table Report (
    reportID INT AUTO_INCREMENT,
    username VARCHAR(20),
    adminID INT,
    report VARCHAR(100),
    PRIMARY KEY (reportID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (adminID) REFERENCES Administration(adminID) ON DELETE CASCADE
);


CREATE Table FavoriteTutors (
    favoriteTutorID INT AUTO_INCREMENT,
    username VARCHAR(20),
    studentID INT,
    tutorID INT,
    PRIMARY KEY (favoriteTutorID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE
);


CREATE Table Comments (
  commentID INT AUTO_INCREMENT,
  username VARCHAR(20),
  commentRecieverID INT,
  comment VARCHAR(500),
  PRIMARY KEY (commentID),
  FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);


CREATE Table Reviews (
    reviewID INT AUTO_INCREMENT,
    username VARCHAR(20),
    studentID INT,
    tutorID INT,
    review VARCHAR(500),
    PRIMARY KEY (reviewID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);


CREATE Table Requests (
    requestID INT AUTO_INCREMENT,
    username VARCHAR(20),
    studentID INT,
    tutorID INT,
    request VARCHAR(500),
    PRIMARY KEY (requestID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE Table Ratings (
    ratingID INT AUTO_INCREMENT,
    username VARCHAR(20),
    studentID INT,
    tutorID INT,
    rating FLOAT,
    PRIMARY KEY (ratingID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);


CREATE Table TimesAvaliable (
   timeID INT AUTO_INCREMENT,
   tutorID INT,
   tutorTime VARCHAR(20),
   tutorDay VARCHAR(20),
   PRIMARY KEY (timeID),
   FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE
);


CREATE Table TutoringSessions (
    sessionID INT AUTO_INCREMENT,
    tutorID INT,
    tutorSession VARCHAR(50),
    PRIMARY KEY (sessionID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE
);


CREATE Table SubjectsTaught (
    subjectID INT AUTO_INCREMENT,
    tutorID INT,
    subject VARCHAR(20),
    PRIMARY KEY (subjectID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID) ON DELETE CASCADE
);


INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user1', 'James', 'Smith', 'password123', 'CS student at SMU', 'student'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user2', 'Mary', 'Thomas', 'password459', 'Engineering student from Austin, TX', 'student'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user3', 'Robert', 'Johnson', 'password789', 'Grad student at Michigan', 'student'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user4', 'Susan', 'Jones', 'pAsSwOrD123', 'Buissness major at Harvard', 'student'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user5', 'William', 'Davis', 'this is a password', 'Ohio State Class of 2024', 'student'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user6', 'Sarah', 'Garcia', 'p@ssw0rd123', 'TA for Data Structures at SMU', 'tutor'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user7', 'Thomas', 'Anderson', '321drowssap', 'History/Writing tutor', 'tutor'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user8', 'Jessica', 'Harris', '1234567890', 'Calculus tutor with years of experience', 'tutor'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user9', 'Daniel', 'Perez', 'test', 'Biology tutor', 'tutor'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user10', 'Lisa', 'Allen', '0987654321', 'I am the admin for this website', 'admin'); 
INSERT INTO User (username, firstName, lastName, passWord, bio, userRole) VALUES ('user11', 'Patrick', 'Bateman', 'bizBro', 'Top business tutor in New Yrok City', 'tutor'); 


INSERT INTO Students (username) VALUES ('user1');
INSERT INTO Students (username) VALUES ('user2');
INSERT INTO Students (username) VALUES ('user3');
INSERT INTO Students (username) VALUES ('user4');
INSERT INTO Students (username) VALUES ('user5');

INSERT INTO Tutors (username) VALUES ('user6');
INSERT INTO Tutors (username) VALUES ('user7');
INSERT INTO Tutors (username) VALUES ('user8');
INSERT INTO Tutors (username) VALUES ('user9');
INSERT INTO Tutors (username) VALUES ('user11');

INSERT INTO Administration (username) VALUES ('user10');


INSERT INTO Question (studentID, tutorID, questionText, answer) VALUES (1, 1, 'What is the difference between pass by value and pass by reference for pointers?', '');
INSERT INTO Question (studentID, tutorID, questionText, answer) VALUES (3, 2, 'When was the Declaration of Independence signed?', '');
INSERT INTO Question (studentID, tutorID, questionText, answer) VALUES (4, 5, 'What are the components of a SWOT Analysis?', '');
INSERT INTO Question (studentID, tutorID, questionText, answer) VALUES (5, 3, 'What is the derivative of x-squared plus 3x?', '');

INSERT INTO FavoriteTutors (username, studentID, tutorID) VALUES ('user1', 1, 1);
INSERT INTO FavoriteTutors (username, studentID, tutorID) VALUES ('user3', 3, 2);
INSERT INTO FavoriteTutors (username, studentID, tutorID) VALUES ('user4', 4, 5);

INSERT INTO Ratings (userName, studentID, tutorID, rating) VALUES ('user1', 1, 1, 5);
INSERT INTO Ratings (userName, studentID, tutorID, rating) VALUES ('user2', 2, 3, 0.9);
INSERT INTO Ratings (userName, studentID, tutorID, rating) VALUES ('user3', 3, 2, 4.5);
INSERT INTO Ratings (userName, studentID, tutorID, rating) VALUES ('user4', 4, 5, 4);

INSERT INTO SubjectsTaught (tutorID, subject) VALUES (1, 'Computer Science');
INSERT INTO SubjectsTaught (tutorID, subject) VALUES (2, 'Writing');
INSERT INTO SubjectsTaught (tutorID, subject) VALUES (3, 'Math');
INSERT INTO SubjectsTaught (tutorID, subject) VALUES (4, 'Science');
INSERT INTO SubjectsTaught (tutorID, subject) VALUES (5, 'Business');





