import React, { useState, useEffect } from 'react';  
import './Navbar.css';
import icon from '../../Images/icon.svg';
import logotype from '../../Images/logotype.svg';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const [menuButtonActive, setMenuButtonActive] = useState(false); 
    const [logInButtonActive, setLogInButtonActive] = useState(false);
    const [signUpButtonActive, setSignUpButtonActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para autenticación

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

    // Checar si el usuario está logueado al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token'); // Cambia 'token' por el nombre de tu clave de almacenamiento
        setIsLoggedIn(!!token); // Si existe un token, el usuario está logueado
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

    // Función para manejar logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        setIsLoggedIn(false); // Cambia el estado de autenticación
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
                        
                        {/* Mostrar "Log in" y "Sign up" si el usuario no está logueado */}
                        {!isLoggedIn && (
                            <>
                                <a href="/log-in" className={`boton-2 ${logInButtonActive ? 'active' : ''} log-in`} onClick={handleLogInButtonClick}>Log in</a>
                                <a href="/sign-up" className={`boton-2 ${signUpButtonActive ? 'active' : ''} sign-up`} onClick={handleSignUpButtonClick}>Sign-up</a>
                            </>
                        )}

                        {/* Mostrar "Logout" si el usuario está logueado */}
                        {isLoggedIn && (
                            <button className='boton-2 logout' onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};
