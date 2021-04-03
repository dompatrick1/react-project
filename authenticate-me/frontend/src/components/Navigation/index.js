import React from 'react';
import {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/products'
import ProfileButton from './ProfileButton';
import logo from '../../images/logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const products = useSelector(state => state.products);

  const productsArray = Object.values(products)


  const [searchTerm, setSearchTerm] = useState('')

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
      <form className="search-bar">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
          { searchTerm.length ?
            productsArray.filter((val) => {
              if (searchTerm === "") {
                return val
              } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }).map((val, key) => {
              return (
                <div className="search-results" key={key}>
                  <a href={`/${val.id}`}>{val.name}</a>
                </div>
              )
            })
          : null}
        </form>
    </div>
    </>
  );
}

export default Navigation;
