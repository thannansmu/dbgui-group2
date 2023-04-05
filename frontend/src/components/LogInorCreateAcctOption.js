import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {Button} from './Button';

export default function LogInorCreateAcctOption(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = ()=> setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton =()=>{if (window.innerWidth <=960){
    setButton(false);
    } else {
        setButton(true);
    }};

    useEffect(()=> {showButton();
    }, []);

    window.addEventListener('resize', showButton);


return(
    <div className="button-container">
    
    {button && <Button buttonStyle='btn--outline'>Login</Button>}
    {button && <Button buttonStyle='btn--outline'>Create Account</Button>}
    <button onclick="window.location.href = 'httml://localhost:3000';">Login</button>
    <button onclick="window.location.href = 'httml://localhost:3000/about';">Create Account</button>

    </div>

);
}