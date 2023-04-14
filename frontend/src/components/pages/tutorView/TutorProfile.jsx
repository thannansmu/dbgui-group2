import { useState, useEffect } from 'react';
import { UserInfo } from '../UserInfo';
import { Button } from '../../Button';
import '../../styles/Tutor.css';
import '../../styles/Button.css';

export const TutorProfile = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return <>
        <h1 className='title'>Your Profile</h1>

        <div>

            <br></br>
            <UserInfo />
            <div>First Name</div>
            <div>Last Name</div>
            <div>Bio</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>

            <div className="button-container" style={{ display: 'flex', flexDirection: 'column' }}>

                {button && (
                    <Button to="/appts" className="page-button" style={buttonStyles}>
                        <i>  View Appointments</i>
                    </Button>
                )}

                {button && (
                    <Button to="/questions" className="page-button" style={buttonStyles}>
                        <i> View Questions</i>
                    </Button>
                )}

                {button && (
                    <Button to="/review-student" className="page-button" style={buttonStyles}>
                        <i> Review Student</i>
                    </Button>
                )}
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <h2 className='title'>Your Answers</h2>

            <h2 className='title'>Your Reviews</h2>
        </div>
    </>;
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