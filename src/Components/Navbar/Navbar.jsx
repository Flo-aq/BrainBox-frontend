import React, { useState} from 'react';
import './Navbar.css'
import icon from "../../Images/icon.svg"
import logotype from "../../Images/logotype.svg"

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav>
            <div className='top-bar'>
                <div className="logo-container">
                    <div className="logo-full">
                        <img src = { icon } alt = "Icon" className='icon' href="/"/>
                        <img src = { logotype } alt = "Logotype" className='logotype'/>
                    </div>
                </div>
                <div className='menu' onClick = {() => {setMenuOpen(!menuOpen)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className={ menuOpen ? "open-box" : "normal-box"}>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about-us">About Us</a>
                </li>
                <button className='log-in'>
                    Log in
                </button>
                <button className='sign-up'>
                    Sign up
                </button>
            </div>


            
            
            
        </nav>
    );
};