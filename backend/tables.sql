-- Need to figure out data types.
CREATE Table Students(
    username CHAR(20), 
    firstName CHAR(20), 
    lastName CHAR(20), 
    comments CHAR(20), 
    password CHAR(20),
    studentID INTEGER, 
    bio CHAR(500), 
    favoriteTutors CHAR(20), 
    requests CHAR(20), 
    rating CHAR(20), 
    reviews CHAR(20)
);

CREATE Table Tutors (
    username CHAR(20), 
    firstName CHAR(20), 
    lastName CHAR(20),  
    password CHAR(20),
    tutorID INTEGER, 
    bio CHAR(500), 
    favoriteTutors CHAR(20), 
    requests CHAR(20), 
    rating CHAR(20), 
    reviews CHAR(20),
    timesAvaliable CHAR(20),
    tutoringSessions CHAR(20),
    subjectsTaught CHAR(20)
);


CREATE Table Administration (
    username CHAR(20),
    password CHAR(20),
    adminID CHAR(20),
    name CHAR(20),
    bio CHAR(500),
    reports CHAR(20),
);



CREATE Table Question ();


CREATE Table Report ();
















