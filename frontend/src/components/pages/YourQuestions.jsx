import React from 'react';

export const YourQuestions = ({ loggedInUser }) => {
  return (
    <div>
      <h2><u>Your Questions</u></h2>
      <h3>Username: {loggedInUser}</h3>
      {/* Your Questions content */}
    </div>
  );
}
