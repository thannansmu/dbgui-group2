import React from 'react';
import {UserInfo} from './UserInfo';
import {YourQuestions} from './YourQuestions';

export const ProfilePage = () => {
  return <>
    <div>
      <div>
        <UserInfo />
      </div>
      <div>
        <YourQuestions />
      </div>
      <div>
        <button>Ask Question</button>
        <button>Schedule Appointment</button>
        <button>Review Appointment</button>
        <button>Your Booked Appointment(s)</button>
        <button>Your Reviews</button>
      </div>
    </div>
  </>;
}
