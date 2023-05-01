import { useState, useEffect } from 'react';
import { Button } from '../../Button';
import '../../styles/Tutor.css';
import '../../styles/Button.css';
import { getUserByAttribute } from '../../../Api';

export const TutorProfileStudent = ({viewTutor}) => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    console.log(viewTutor);

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
        getUserInfo();
    }, [viewTutor]);
    

    const getUserInfo = async () => {

        const response = await getUserByAttribute(viewTutor, 'firstName');
        setFirstName(response[0].firstName);
        const lastResponse = await getUserByAttribute(viewTutor, 'lastName');
        setLastName(lastResponse[0].lastName);
        const bioResponse = await getUserByAttribute(viewTutor, 'bio');
        setBio(bioResponse[0].bio);
    };

    window.addEventListener('resize', showButton);

    return <>
        <div>
            <br></br>
            <h1>
                <u>Tutor Information:</u>
                <br></br>
                <br></br>
            </h1>

            {(firstName && lastName) && <h2>Name: {firstName} {lastName}</h2>}
            <br></br>
            {bio && <h3>Bio: {bio}</h3>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>

            <div className="button-container" style={{ display: 'flex', flexDirection: 'column' }}>

                {button && (
                    <Button to="/schedule-appt" className="page-button" style={buttonStyles}>
                        <i>  Back </i>
                    </Button>
                )}
            </div>
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