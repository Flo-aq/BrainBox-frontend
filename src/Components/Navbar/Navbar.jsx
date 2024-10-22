import React, { useState, useEffect } from 'react'; 
import './Navbar.css';
import icon from '../../Images/icon.svg';
import logotype from '../../Images/logotype.svg';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Controla si el menú está abierto
    const [buttonActive, setButtonActive] = useState(false); // Controla el estado del botón
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Estado para el ancho de la ventana

    // Función para manejar cambios en el ancho de la ventana
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Agrega el listener de resize al componente
        window.addEventListener('resize', handleResize);
        // Limpia el listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleButtonClick = () => {
        setButtonActive(!buttonActive); // Cambia el estado activo del botón
        setMenuOpen(!menuOpen); // Cambia el estado del menú
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
                        className={`menu-button ${buttonActive ? 'active' : ''}`} // Añade clase activa si está activo
                        onClick={handleButtonClick}
                    >
                        {buttonActive ? '-' : '+'} {/* Cambia el texto del botón */}
                    </button>
                </div>
                {(menuOpen || windowWidth > 750) && ( // Condición para mostrar la bottom-bar
                    <div className='bottom-bar'>
                        <a href="/" className='home-button'>Home</a>
                        <a href="/about-us" className='about-us-button'>About Us</a>
                        <a href="/log-in" className='log-in-button'>Log in</a>
                        <a href="/sign-up" className='sign-up-button'>Sign-up</a>
                    </div>
                )}
            </nav>
        </div>
    );
};
