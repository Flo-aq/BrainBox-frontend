import React from 'react';
import './Logo.css';
import icon from '../../Images/icon.svg';
import logotype from '../../Images/logotype.svg';

const Button_base = () => {
    return (
        <div className='logo-full' href='/' >
            <img src={icon} alt='Icon' className='icon' />
            <img src={logotype} alt='Logotype' className='logotype' />
        </div>
    );
};

export default Button_base;