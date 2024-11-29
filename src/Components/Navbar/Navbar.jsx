import React, { useState } from 'react';
import './Navbar.css';
import icon from '../../Images/logo.svg'

export const Navbar = () => {
  // TODO show according to user-token
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(prev => !prev);
  };

  const handleClick = (e) => {
    // Lógica de log out
    console.log('Log Out clicked');
  };

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')


  return (
    <div className={`navbar ${expanded ? 'expanded' : ''}`}>
      <div className='navbar-section'>
        {!expanded ? <button className='open-navbar' onClick={toggleNavbar}>
          <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke="none"
              strokeLinecap="round"
              strokeLinejoin="round" fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
          </svg>
        </button>
          : <button className='close-navbar' onClick={toggleNavbar}>
            <svg stroke="none"
              strokeLinecap="round"
              strokeLinejoin="round" fill="currentColor" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
            </svg>
          </button>}
      </div>
      <div className="navbar-section logo">
        <a href="/">
          <span className="navbar-logo">
            <img src={icon} alt='Logo' className='logo' />
          </span>
        </a>
      </div>
      {role === "user" && (
      <div className="navbar-section">
        <a href="/calendar">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z" stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" />
            </svg>
            <span>Calendar</span>
          </div>
        </a>
        <a href="/userclasses">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M20.005 2C21.107 2 22 2.898 22 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4v-4H2v-2h2v-3H2v-2h2V8H2V6h2V2h16.005zM8 4H6v16h2V4zm12 0H10v16h10V4z" />
            </svg>
            <span>My Classes</span>
          </div>
        </a>
      </div>
      )}
      {role === "admin" && (
      <div className="navbar-section">
        <a href="/adminclasses">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M5 12.5c0 .313.461.858 1.53 1.393C7.914 14.585 9.877 15 12 15c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171C17.35 11.349 14.827 12 12 12s-5.35-.652-7-1.671V12.5zm14 2.829C17.35 16.349 14.827 17 12 17s-5.35-.652-7-1.671V17.5c0 .313.461.858 1.53 1.393C7.914 19.585 9.877 20 12 20c2.123 0 4.086-.415 5.47-1.107 1.069-.535 1.53-1.08 1.53-1.393v-2.171zM3 17.5v-10C3 5.015 7.03 3 12 3s9 2.015 9 4.5v10c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5zm9-7.5c2.123 0 4.086-.415 5.47-1.107C18.539 8.358 19 7.813 19 7.5c0-.313-.461-.858-1.53-1.393C16.086 5.415 14.123 5 12 5c-2.123 0-4.086.415-5.47 1.107C5.461 6.642 5 7.187 5 7.5c0 .313.461.858 1.53 1.393C7.914 9.585 9.877 10 12 10z" />
            </svg>
            <span>All Classes</span>
          </div>
        </a>
      </div>
      )}
      <div className="navbar-section">
        <a href="/">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M13 19h6V9.978l-7-5.444-7 5.444V19h6v-6h2v6zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z" />
            </svg>
            <span>Landing Page</span>
          </div>
        </a>
        <a href="/about-us">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M5 5v14h14V5H5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5.869 12l-.82 2H6.833L11 7h2l4.167 10H14.95l-.82-2H9.87zm.82-2h2.622L12 9.8 10.689 13z" />
            </svg>
            <span>About Us</span>
          </div>
        </a>
        <a href="/instructions">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" />
            </svg>
            <span>Instructions</span>
          </div>
        </a>
      </div>
      
      <div className="navbar-section">
      {token === "" && ( <>
        <a href="login">
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm8 6h3v2h-3v3.5L15 18l5-4.5V17z" />
            </svg>
            <span>Log In</span>
          </div>
        </a>
        <a href='/signup'>
          <div className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 18L17 18M17 18L14 18M17 18V15M17 18V21M11 21H4C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" fill="none" stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={"2px"} />
            </svg>
            <span>Sign Up</span>
          </div>
        </a>
        </>
      )}
        {token !== "" && (
          <div onClick={handleClick} className="navbar-item">
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
                fill="currentColor"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Log Out</span>
          </div>
        )}
      </div>
    </div>
  );
};