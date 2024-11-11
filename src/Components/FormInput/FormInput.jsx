import { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, required, show,...inputProps } = props;
  const [focus, setFocused] = useState(false);
  const [modified, setModified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    setModified(true);
    onChange(e);
  };

  const isValid = modified && errorMessage === "";
  const inputClass = `input ${isValid ? 'valid' : modified ? 'invalid' : ''}`;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Cambia el estado al hacer clic
  };

  return (
    <div className={`formInput container-${id} ${show}`}>
      <div className="input-header-container">
        <label>{label}</label>
        {(label === "Nombre de usuario" || label === "Contraseña") && inputProps.className.includes("SignUpForm") ? (
          <div className="tooltip">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11h-3c0-3 1.6-4 2.7-4.6 0.4-0.2 0.7-0.4 0.9-0.6 0.5-0.5 0.3-1.2 0.2-1.4-0.3-0.7-1-1.4-2.3-1.4-2.1 0-2.5 1.9-2.5 2.3l-3-0.4c0.2-1.7 1.7-4.9 5.5-4.9 2.3 0 4.3 1.3 5.1 3.2 0.7 1.7 0.4 3.5-0.8 4.7-0.5 0.5-1.1 0.8-1.6 1.1-0.9 0.5-1.2 1-1.2 2z" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z" stroke="currentColor" fill="currentColor"></path>
            </svg>

            <div className="tooltiptext">{label === "Nombre de usuario" ? "Debe tener entre 3 y 16 números y/o letras" : "Debe tener de 8 a 20 caracteres, y tener al menos\nuna letra, un número y un carácter especial"}</div>
          </div>

        ) : null}
        {required  && (inputProps.className.includes("SignUpForm") || (inputProps.className.includes("CreateEventForm") && (inputProps.name !== "startDate" || ( inputProps.name === "startDate" && show === "isAllDay")))) ? <span className="required-span">Obligatorio</span> : null}
      </div>
      <div className="input-container">
        <input
          {...inputProps}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          focus={focus.toString()}
          modified={modified.toString()}
          className={`${inputProps.className} ${inputClass}`}
          type={label === "Contraseña" || label === "Confirmar contraseña" ? (showPassword ? "text" : "password") : inputProps.type}
        />
        {label === "Contraseña" || label === "Confirmar contraseña" ? (

          <div className="change-password-visibility">
            <input type="checkbox" className="input-change-password-visibility" onChange={handleTogglePasswordVisibility}></input>
            <div className="shadow-aux"></div>
            <div className="background-aux"></div>
            <svg fill="currentColor" className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
            <svg fill="currentColor" className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
          </div>
        ) : null}
      </div>
      <div className="error-container"><span className="errorMessage" >{errorMessage}</span></div>
    </div>
  );
};

export default FormInput;
