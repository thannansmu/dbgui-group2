import React from "react";

export const TimeFrame = ({ startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <div>
      <label htmlFor="start-time">Start Time:</label>
      <input
        type="time"
        id="start-time"
        name="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br />
      <label htmlFor="end-time">End Time:</label>
      <input
        type="time"
        id="end-time"
        name="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
  );
};
