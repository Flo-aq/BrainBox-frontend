import React, { useEffect, useRef, useState } from "react";
import "./Accordion.css";

function Accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">{props.title}</p>
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
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{props.content}</div>
      </div>
    </div>
  );
}

export default Accordion;
