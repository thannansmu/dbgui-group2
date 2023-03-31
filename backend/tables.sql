CREATE Table Students(
    username VARCHAR(20), 
    firstName VARCHAR(20), 
    lastName VARCHAR(20), 
    comments VARCHAR(500), 
    password VARCHAR(20),
    studentID INTEGER, 
    bio VARCHAR(500), 
    rating INTEGER,
    PRIMARY KEY (username, studentID)
);

CREATE Table Tutors (
    username VARCHAR(20), 
    firstName VARCHAR(20), 
    lastName VARCHAR(20),  
    password VARCHAR(20),
    tutorID INTEGER, 
    bio VARCHAR(500), 
    rating VARCHAR(20),
    PRIMARY KEY (username, tutorID)
);


CREATE Table Administration (
    username VARCHAR(20),
    password VARCHAR(20),
    adminID INTEGER,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    bio VARCHAR(500),
    PRIMARY KEY (username)
);

CREATE Table Question (
    questionID INTEGER,
    studentID INTEGER,
    tutorID INTEGER,
    questionText VARCHAR(500),
    answer VARCHAR(500),
    PRIMARY KEY (questionID, studentID, tutorID),
    FOREIGN KEY (studentID) REFERENCES Students,
    FOREIGN KEY (tutorID) REFERENCES Tutors,
);


CREATE Table Report ();


CREATE Table FavoriteTutors ();


CREATE Table Comments ();


CREATE Table Reviews ();


CREATE Table Requests ();


CREATE Table TimesAvaliable ();


CREATE Table TutoringSessions ();


CREATE Table SubjectsTaught ();

