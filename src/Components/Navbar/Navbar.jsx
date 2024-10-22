import React, { useState, useEffect } from 'react'; 
import './Navbar.css';
import icon from '../../Images/icon.svg';
import logotype from '../../Images/logotype.svg';

export const Navbar = ({ onOpenModal }) => {  // Add onOpenModal as a prop
    const [menuOpen, setMenuOpen] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleButtonClick = () => {
        setButtonActive(!buttonActive);
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <nav>
                <div className='top-bar'>
                    <div className='logo-container'>
                        <div className='logo-full' href='/' >
                            <img src={icon} alt='Icon' className='icon'/>
                            <img src={logotype} alt='Logotype' className='logotype' />
                        </div>
                    </div>
                    <button
                        className={`menu-button ${buttonActive ? 'active' : ''}`}
                        onClick={handleButtonClick}
                    >
                        {buttonActive ? '-' : '+'}
                    </button>
                </div>
                {(menuOpen || windowWidth > 750) && (
                    <div className='bottom-bar'>
                        <a href="/" className='home-button'>Home</a>
                        <a href="/about-us" className='about-us-button'>About Us</a>
                        <a href="/log-in" className='log-in-button'>Log in</a>
                        <a href="/sign-up" className='sign-up-button'>Sign-up</a>
                        {/* Add the Create Event button */}
                        <button
                            className='create-event-button'
                            onClick={onOpenModal}
                        >
                            Create Event
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};
