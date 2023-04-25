import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../styles/Button.css';

export const AdminPage=()=>
{

 const [button, setButton] = useState(true);
return(<div><h1>Admin Dashboard</h1>
{button && (
  <Button to="/delete-user" className="page-button" style={buttonStyles}>
    <i> Delete User</i>
  </Button>
)}

{button && (
  <Button to="/user-reports" className="page-button" style={buttonStyles}>
    <i> User Reports</i>
  </Button>
)}

</div>);
}


const buttonStyles = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    padding: '10px 20px',
    color: '#333',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px'
  };