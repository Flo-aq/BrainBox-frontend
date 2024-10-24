import React, { useState, useEffect } from 'react'; 
import './Navbar.css';
import icon from '../../Images/icon.svg'
import logotype from '../../Images/logotype.svg'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const [menuButtonActive, setMenuButtonActive] = useState(false); 
    const [logInButtonActive, setLogInButtonActive] = useState(false);
    const [signUpButtonActive, setSignUpButtonActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Función para manejar cambios en el ancho de la ventana
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMenuButtonClick = () => {
        setMenuButtonActive(!menuButtonActive); 
        setMenuOpen(!menuOpen); 
    };

    const handleLogInButtonClick = () => {
        setLogInButtonActive(!logInButtonActive);
    };

    const handleSignUpButtonClick = () => {
        setSignUpButtonActive(!signUpButtonActive); 
    };

    


    return (
        <div>
            <nav>
                <img src={icon} alt='Icon' className='icon' />
                <img src={logotype} alt='Logotype' className='logotype' />
                <button
                    className={`boton-2 menu ${menuButtonActive ? 'active' : 'inactive'}`} 
                    onClick={handleMenuButtonClick}
                >
                    {menuButtonActive ? '▲ Menú' : '▼ Menú'}
                </button>
                
                {(menuOpen || windowWidth >= 750) && (
                    <div className='options-container'>
                        <a href="/" className='boton-2 home'>Home</a>
                        <a href="/about-us" className='boton-2 about-us'>About Us</a>
                        <a href="/log-in" className={`boton-2 ${logInButtonActive ? 'active' : ''} log-in`} onClick={handleLogInButtonClick}>Log in</a>
                        <a href="/sign-up" className={`boton-2 ${signUpButtonActive ? 'active' : ''} sign-up`} onClick={handleSignUpButtonClick}>Sign-up</a>
                    </div>
                )}

                
            </nav>
        </div>
    );
};
