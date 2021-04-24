// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className="signup-link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-list">
      <li>
        <div className="home-container">
            <NavLink className="home-button" exact to="/">
              <a href="/" className="logo">
                <img className="logo" src={"/images/archibnb_logo.png"} alt="logo"/>
              </a>
            </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;