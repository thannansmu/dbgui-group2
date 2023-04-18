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

INSERT INTO Students (username) VALUES ('user1');
INSERT INTO Students (username) VALUES ('user2');
INSERT INTO Students (username) VALUES ('user3');
INSERT INTO Students (username) VALUES ('user4');
INSERT INTO Students (username) VALUES ('user5');

INSERT INTO Tutors (username) VALUES ('user6');
INSERT INTO Tutors (username) VALUES ('user7');
INSERT INTO Tutors (username) VALUES ('user8');
INSERT INTO Tutors (username) VALUES ('user9');

INSERT INTO Administration (username) VALUES ('user10');

INSERT INTO Report(username, adminID, report) VALUES ('user1', 1234, 'report1');
INSERT INTO Report(username, adminID, report) VALUES ('user2', 1235, 'report2');
INSERT INTO Report(username, adminID, report) VALUES ('user3', 1236, 'report3');
INSERT INTO Report(username, adminID, report) VALUES ('user4', 1237, 'report4');
INSERT INTO Report(username, adminID, report) VALUES ('user5', 1238, 'report5');


INSERT INTO FavoriteTutors(username, studentID, tutorID) VALUES ('user4', 1001, 2001); 
INSERT INTO FavoriteTutors(username, studentID, tutorID) VALUES ('user6', 1002, 2002); 
INSERT INTO FavoriteTutors(username, studentID, tutorID) VALUES ('user7', 1003, 2003); 
INSERT INTO FavoriteTutors(username, studentID, tutorID) VALUES ('user8', 1004, 2004); 
INSERT INTO FavoriteTutors(username, studentID, tutorID) VALUES ('user9', 1005, 2005); 

INSERT INTO Comments(username, commentRecieverID, comment) VALUES ('user1', 456, 'hello');
INSERT INTO Comments(username, commentRecieverID, comment) VALUES ('user2', 457, 'hey');
INSERT INTO Comments(username, commentRecieverID, comment) VALUES ('user3', 458, 'hii');
INSERT INTO Comments(username, commentRecieverID, comment) VALUES ('user4', 459, 'bye');
INSERT INTO Comments(username, commentRecieverID, comment) VALUES ('user5', 460, 'hel');

INSERT INTO Reviews(username, studentID, tutorID, review) VALUES ('user1', 1, 1, 'good')
INSERT INTO Reviews(username, studentID, tutorID, review) VALUES ('user3',3,2, 'excellent' )
INSERT INTO Reviews(username, studentID, tutorID, review) VALUES ('user4',4,5, 'amazing' )

INSERT INTO Requests(username, studentID, tutorID, request) VALUES('user1' 1, 1, 'meet at 5')
INSERT INTO Requests(username, studentID, tutorID, request) VALUES('user3' 3,2, 'meet at 2')
INSERT INTO Requests(username, studentID, tutorID, request) VALUES('user4', 4, 5, 'meet at 11')

INSERT INTO TimesAvailable(tutorID, tutorTime, tutorDay) VALUES (1, '3:00', 'Monday');
INSERT INTO TimesAvailable(tutorID, tutorTime, tutorDay) VALUES (2, '5:00', 'Tuesday');
INSERT INTO TimesAvailable(tutorID, tutorTime, tutorDay) VALUES (5, '7:00', 'Wednesday');

INSERT INTO TutoringSessions(tutorID, tutorSession) VALUES (1, '3:00');
INSERT INTO TutoringSessions(tutorID, tutorSession) VALUES (2, '5:00');
INSERT INTO TutoringSessions(tutorID, tutorSession) VALUES (1, '7:00');














