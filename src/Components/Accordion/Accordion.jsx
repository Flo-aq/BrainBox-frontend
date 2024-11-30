import React, { useState, useRef } from 'react';
import './Accordion.css';

const Accordion = ({ content, title, llave }) => {
  const [active, setActive] = useState(false);
  const accordionSection = useRef(null);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <div ref={accordionSection} className={`accordion__section ${llave ? llave : ""}`}>
      <div className={`accordion ${active ? "active" : ""}`} onClick={toggleAccordion}>
        <p className="accordion__title">{title}</p>
        <svg
          className="arrow text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 29 17"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.5 2.5 12 12 12-12"
          />
        </svg>
      </div>
      <div className="accordion__content" style={{ display: active ? 'flex' : 'none' }}>
      
        <div>
          {content.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <p>{item.text}</p>
              <img src={item.imgSrc} alt={`Imagen ${index + 1}`} style={{
                width: index === 1 || index === 2 || index === 3 ? '300px' : '150px', // Cambiar el tamaño si el índice es 2
                alignSelf: 'center',
              }} />
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default Accordion;
