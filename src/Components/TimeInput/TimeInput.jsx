import React, { useState } from 'react';
import './TimeInput.css';

const TimeInput = ({
  disabled,
  name,
  onChange,
  errors = {}, // Ahora recibimos un objeto de errores
  modified = {} // Opcional: también podemos recibir el estado modified de cada campo
}) => {
  const hours = ["--", ...Array.from({ length: 12 }, (_, i) => i + 1)];
  const minutes = ['--', '00', '10', '20', '30', '40', '50'];
  const periods = ['--', 'AM', 'PM'];

  const [focused, setFocused] = useState({
    hour: false,
    minutes: false,
    period: false
  });

  const [localModified, setLocalModified] = useState({
    hour: false,
    minutes: false,
    period: false
  });

  const getInputClass = (inputType) => {
    const isModified = modified[`${name}${inputType}`] || localModified[inputType.toLowerCase()];
    const hasError = errors[`${name}${inputType}`];
    return `${inputType.toLowerCase()}-input ${name} ${isModified ? (hasError ? 'invalid' : 'valid') : ''
      }`;
  };

  const handleFocus = (inputType) => {
    setFocused(prev => ({
      ...prev,
      [inputType]: true
    }));
  };

  const handleBlur = (inputType) => {
    setFocused(prev => ({
      ...prev,
      [inputType]: false
    }));
  };

  const handleChange = (e) => {
    const inputType = e.target.name.replace(name, '').toLowerCase();
    setLocalModified(prev => ({
      ...prev,
      [inputType]: true
    }));
    onChange(e);
  };

  return (
    <div className={`time-input-container ${name}`}>
      <select
        name={`${name}Hour`}
        className={getInputClass('Hour')}
        required
        onChange={handleChange}
        onFocus={() => handleFocus('hour')}
        onBlur={() => handleBlur('hour')}
        disabled={disabled}
        defaultValue="--"
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <span className="divider-1">:</span>
      <select
        name={`${name}Minutes`}
        className={getInputClass('Minutes')}
        required
        onChange={handleChange}
        onFocus={() => handleFocus('minutes')}
        onBlur={() => handleBlur('minutes')}
        disabled={disabled}
        defaultValue="--"
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <span className="divider-2"> </span>
      <select
        name={`${name}Period`}
        className={getInputClass('Period')}
        required
        onChange={handleChange}
        onFocus={() => handleFocus('period')}
        onBlur={() => handleBlur('period')}
        disabled={disabled}
        defaultValue="--"
      >
        {periods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>

  );
};

export default TimeInput;