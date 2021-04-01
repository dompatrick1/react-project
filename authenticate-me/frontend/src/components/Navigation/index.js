import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../images/logo.png'
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
        <div className="login">
          <NavLink className="_login" to="/login">Log In</NavLink>
        </div>
        <div className="signup">
          <NavLink className="_signup" to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <>
    <div className="navbar-container">
      <div className="logo-link">
        <NavLink exact to="/"><img className='logo' src={logo}alt={''}></img></NavLink>
      </div>
      <div className="sessionLinks">
        {isLoaded && sessionLinks}
      </div>
    </div>
    </>
  );
}

export default Navigation;
