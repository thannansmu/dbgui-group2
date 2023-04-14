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

