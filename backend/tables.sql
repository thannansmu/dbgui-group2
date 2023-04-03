CREATE DATABASE IF NOT EXISTS tutoringTables;

USE tutoringTables;

CREATE Table Students(
    username VARCHAR(20), 
    firstName VARCHAR(20), 
    lastName VARCHAR(20), 
    password VARCHAR(20),
    studentID INTEGER, 
    bio VARCHAR(500), 
    rating FLOAT,
    PRIMARY KEY (username, studentID)
);

CREATE Table Tutors (
    username VARCHAR(20), 
    firstName VARCHAR(20), 
    lastName VARCHAR(20),  
    password VARCHAR(20),
    tutorID INTEGER, 
    bio VARCHAR(500), 
    rating FLOAT,
    PRIMARY KEY (username, tutorID)
);


CREATE Table Administration (
    username VARCHAR(20),
    password VARCHAR(20),
    adminID INTEGER,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    bio VARCHAR(500),
    PRIMARY KEY (username, adminID)
);

CREATE Table Question (
    questionID INTEGER,
    studentID INTEGER,
    tutorID INTEGER,
    questionText VARCHAR(500),
    answer VARCHAR(500),
    PRIMARY KEY (questionID, studentID, tutorID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID)
);


CREATE Table Report (
    username VARCHAR(20),
    report VARCHAR(100),
    studentID INTEGER,
    adminID INTEGER,
    PRIMARY KEY (username, studentID, adminID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID),
    FOREIGN KEY (adminID) REFERENCES Administration(adminID)
);


CREATE Table FavoriteTutors (
    username VARCHAR(20),
    tutorID INTEGER,
    PRIMARY KEY (username, tutorID),
    FOREIGN KEY (username) REFERENCES Students(username),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID)
);


CREATE Table Comments (
    username VARCHAR(20),
    comment VARCHAR(100),
    studentID INTEGER,
    tutorID INTEGER,
    PRIMARY KEY (username, studentID, tutorID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID)
);


CREATE Table Reviews (
    username VARCHAR(20),
    review VARCHAR(100),
    studentID INTEGER,
    tutorID INTEGER,
    PRIMARY KEY (username, studentID, tutorID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID)
);


CREATE Table Requests (
    username VARCHAR(20),
    request VARCHAR(100),
    studentID INTEGER,
    tutorID INTEGER,
    PRIMARY KEY (username, studentID, tutorID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID),
    FOREIGN KEY (tutorID) REFERENCES Tutors(tutorID)
);


CREATE Table TimesAvaliable (
    username VARCHAR(20),
    tutorTime VARCHAR(20),
    PRIMARY KEY (username),
    FOREIGN Key (username) REFERENCES Tutors(username)
);


CREATE Table TutoringSessions (
    username VARCHAR(20),
    tutorSession VARCHAR(20),
    PRIMARY KEY (username),
    FOREIGN Key (username) REFERENCES Tutors(username)
);


CREATE Table SubjectsTaught (
    username VARCHAR(20),
    tutorSubject VARCHAR(20),
    PRIMARY KEY (username),
    FOREIGN Key (username) REFERENCES Tutors(username)
);

