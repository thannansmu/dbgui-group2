import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const LogInorCreateAcctOption = () => {
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


    return (
        <div className="button-container">
          {button && (
            <Button  to="/login">
              Login
            </Button>
          )}
          {button && (
            <Button  to="/create-account">
              Create Account
            </Button>
          )}
        </div>
      );
}