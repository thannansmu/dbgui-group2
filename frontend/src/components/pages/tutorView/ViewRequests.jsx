

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTutorRequests } from '../../../Api/tutorApi';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const { tutorID } = useParams();

  const fetchRequests = async () => {
    try {
      const requestsData = await getTutorRequests(tutorID);
      setRequests(requestsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [tutorID]);

  return (
    <div>
      <h1>View Requests</h1>
      {requests.map((request) => (
        <div key={request.requestID}>
          <h3>{request.request}</h3>
          <p>From: {request.username} (Student ID: {request.studentID})</p>
        </div>
      ))}
    </div>
  );
};

export default ViewRequests;


