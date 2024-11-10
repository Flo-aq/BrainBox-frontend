import React, { useState, useEffect } from 'react';
import './Navbar.css';
import icon from '../../Images/logo.svg'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuButtonActive, setMenuButtonActive] = useState(false);
    const [logInButtonActive, setLogInButtonActive] = useState(false);
    const [signUpButtonActive, setSignUpButtonActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

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

    const handleLogOut = () => {
        setIsLoggedIn(false); // Lógica para cerrar sesión
        // Aquí podrías agregar lógica adicional para cerrar sesión, como borrar un token o limpiar estado
    };

    return (
        <div>
            <nav>
                <img src={icon} alt='Icon' className='icon' />
                <div className='aux'>
                    <button
                        className={`boton-2 menu ${menuButtonActive ? 'active' : 'inactive'}`}
                        onClick={handleMenuButtonClick}
                    >
                        <svg className="arrow text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 17">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 2.5 12 12 12-12" />
                        </svg>
                        <span>Menú</span>
                    </button>
                </div>
                {(menuOpen || windowWidth >= 750) && (
                    <div className='options-container'>
                        <a href="/" className='boton-2 home'>Home</a>
                        <a href="/about-us" className='boton-2 about-us'>About Us</a>
                        <a href="/instructions" className='boton-2 instructions'>Instructions</a>
                        <a href="/calendar" className='boton-2 main'>Main</a>
                        
                        {/* Mostrar botones de login y signup solo si el usuario no está logueado */}
                        {!isLoggedIn && (
                            <>
                                <a href="/log-in" className={`boton-2 ${logInButtonActive ? 'active' : ''} log-in`} onClick={handleLogInButtonClick}>Log in</a>
                                <a href="/sign-up" className={`boton-2 ${signUpButtonActive ? 'active' : ''} sign-up`} onClick={handleSignUpButtonClick}>Sign up</a>
                            </>
                        )}

                        {/* Mostrar botón de logout solo si el usuario está logueado */}
                        {isLoggedIn && (
                            <button className="boton-2 logout" onClick={handleLogOut}>Log out</button>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};