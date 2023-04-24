import { Link } from "react-router-dom";

export const RegisterButton = ({accountType, onRegister, username}) => {
    if(accountType === 'tutor') {
        return <>
             <Link to={`/tutor-form/${username}`}><button className='createAccount' id='registerTutor' style={{marginBottom: '2rem'}} onClick={onRegister}>Register</button></Link>
        </>
    }
    else {
        return <>
             <Link to={'/login'}><button className='createAccount' id='registerTutor' style={{marginBottom: '2rem'}} onClick={onRegister}>Register</button></Link>
        </>
    }
};