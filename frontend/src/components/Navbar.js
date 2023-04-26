import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './styles/Navbar.css';

export const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary"
            style={{ marginRight: '1rem' }}
          >
            &larr; Back
          </button>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Tuder
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-many active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/services-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/about-tutors"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
          </ul>
          {loggedInUser ? (
            <Button buttonStyle="btn--outline" to="/" onClick={handleLogout}>
              Log Out
            </Button>
          ) : (
            button && (
              <Button buttonStyle="btn--outline" to="/sign-up">
                Log in/Create Account
              </Button>
            )
          )}
        </div>
      </nav>
    </>
  );
};
