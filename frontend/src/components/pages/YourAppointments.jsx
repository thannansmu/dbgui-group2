import React, { useState, useEffect } from 'react';

export const YourAppointments = () => {
    
  
    return (
        <div style={{ position: 'relative' }}> 
        <img 
          src="/videos/vid_2.gif" 
          alt="Your GIF" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '300px', 
            height: 'auto', 
            zIndex: 1 
          }} 
        />
        <h1>Your Appointments</h1>
       <table style={{ borderSpacing: ' 30px' }}>
         <thead>
           <tr>
           <th style={{ width: '30%', fontWeight: 'bold', textDecoration: 'underline' }}>Time</th>
            <th style={{ width: '40%', fontWeight: 'bold', textDecoration: 'underline' }}>Tutor</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>10:00 AM</td>
             <td>John Doe</td>
             <td>Confirmed</td>
           </tr>
           <tr>
             <td>11:00 AM</td>
             <td>Jane Smith</td>
             <td>Pending</td>
           </tr>
           <tr>
             <td>1:00 PM</td>
             <td>Bob Johnson</td>
             <td>Confirmed</td>
           </tr>
         </tbody>
       </table>
     </div>
    );
  };