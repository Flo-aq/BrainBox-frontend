import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../../PopUp/PopUp';
import FormInput from '../../FormInput/FormInput'
import './AddClassForm.css'

const AddClassForm = ({ isOpen, onClose, courses }) => {
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });

  const [values, setValues] = useState({
    name: "",
    credits: "",
    schedule: []
  });

  const [modified, setModified] = useState({
    name: false,
    credits: false,
    schedule: false
  });

  const [errors, setErrors] = useState({
    name: "",
    credits: "",
    schedule: ""
  });

  const [scheduleInputs, setScheduleInputs] = useState([{ day: '', block: '' }]);

  const [isValid, setIsValid] = useState({
    name: false,
    credits: false,
    schedule: false
  });

  const days = [
    { initial: 'L', name: 'Lunes' },
    { initial: 'M', name: 'Martes' },
    { initial: 'Mi', name: 'Miércoles' },
    { initial: 'J', name: 'Jueves' },
    { initial: 'V', name: 'Viernes' },
    { initial: 'S', name: 'Sábado' },
    { initial: 'D', name: 'Domingo' }
  ];
  const blocks = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const openPopup = (title, message, isError = false) => {
    setPopup({ isOpen: true, title, message, isError });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, title: '', message: '', isError: false });
  };

  const handleFormClose = () => {
    closePopup();
    onClose();
  };

  const handleRetry = () => {
    closePopup();
    handleSubmit();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setModified(prev => ({ ...prev, [name]: true }));
    setValues(prev => ({ ...prev, [name]: value }));

    const normalizeText = (text) => {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    if (name === 'name') {
      let nameError = '';
      const normalizedValue = normalizeText(value.trim());

      if (!value.trim()) {
        nameError = "El nombre no puede ser vacío";
      } else if (courses.some(course => normalizeText(course.nombre) === normalizedValue)) {
        nameError = "El ramo ya existe";
      }

      setErrors(prev => ({ ...prev, name: nameError }));
      setIsValid(prev => ({ ...prev, name: !nameError }));
    }

    if (name === 'credits') {
      const creditsError = !value ? "Debe seleccionar créditos" : "";
      setErrors(prev => ({ ...prev, credits: creditsError }));
      setIsValid(prev => ({ ...prev, credits: !creditsError }));
    }
  };

  const addScheduleInput = () => {
    setScheduleInputs([...scheduleInputs, { day: '', block: '' }]);
    validateScheduleInputs([...scheduleInputs, { day: '', block: '' }]);
  };

  const onScheduleChange = (index, field, value) => {
    setModified(prev => ({ ...prev, schedule: true }));
    const newScheduleInputs = [...scheduleInputs];
    newScheduleInputs[index][field] = value;
    setScheduleInputs(newScheduleInputs);

    validateScheduleInputs(newScheduleInputs);
  };

  const validateScheduleInputs = (schedules) => {
    const individualValidations = schedules.map(schedule => {
      return schedule.day !== "" && schedule.block !== "";
    });

    const hasInvalidInput = individualValidations.some(valid => !valid);

    if (hasInvalidInput) {
      setErrors(prev => ({ ...prev, schedule: "Schedule invalid" }));
      setIsValid(prev => ({ ...prev, schedule: false }));
      return false;
    }

    const uniqueSchedules = new Set(
      schedules.map(s => `${s.day}-${s.block}`)
    );

    const isValid = uniqueSchedules.size === schedules.length;

    setErrors(prev => ({
      ...prev,
      schedule: isValid ? "" : "Schedule invalid"
    }));
    setIsValid(prev => ({ ...prev, schedule: isValid }));

    return isValid;
  };

  const removeScheduleInput = (index) => {
    const newScheduleInputs = scheduleInputs.filter((_, i) => i !== index);
    setScheduleInputs(newScheduleInputs);
    validateScheduleInputs(newScheduleInputs);
  };

  const formatSchedule = (inputs) => {
    const dayOrder = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];

    const sortedInputs = [...inputs].sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      return dayDiff !== 0 ? dayDiff : a.block.localeCompare(b.block);
    });

    const remainingInputs = [...sortedInputs];
    const formattedGroups = [];

    while (remainingInputs.length > 0) {
      const blockGroups = remainingInputs.reduce((acc, input) => {
        if (!acc[input.block]) acc[input.block] = [];
        acc[input.block].push(input);
        return acc;
      }, {});

      const multiBlockGroups = Object.entries(blockGroups)
        .filter(([_, group]) => group.length > 1);

      if (multiBlockGroups.length > 0) {
        multiBlockGroups.forEach(([block, group]) => {
          const sortedGroup = group.sort((a, b) =>
            dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
          );

          const groupStr = sortedGroup.map(g => g.day).join('-') + ':' + block;
          formattedGroups.push(groupStr);

          sortedGroup.forEach(input => {
            const index = remainingInputs.findIndex(
              r => r.day === input.day && r.block === input.block
            );
            if (index !== -1) remainingInputs.splice(index, 1);
          });
        });
      } else {
        break;
      }
    }

    while (remainingInputs.length > 0) {
      const dayGroups = remainingInputs.reduce((acc, input) => {
        if (!acc[input.day]) acc[input.day] = [];
        acc[input.day].push(input);
        return acc;
      }, {});

      const multiDayGroups = Object.entries(dayGroups)
        .filter(([_, group]) => group.length > 1);

      if (multiDayGroups.length > 0) {
        multiDayGroups.forEach(([day, group]) => {
          const sortedGroup = group.sort((a, b) =>
            a.block.localeCompare(b.block)
          );

          const groupStr = day + ':' + sortedGroup.map(g => g.block).join('-');
          formattedGroups.push(groupStr);

          sortedGroup.forEach(input => {
            const index = remainingInputs.findIndex(
              r => r.day === input.day && r.block === input.block
            );
            if (index !== -1) remainingInputs.splice(index, 1);
          });
        });
      } else {
        break;
      }
    }

    formattedGroups.push(
      ...remainingInputs.map(input => `${input.day}:${input.block}`)
    );

    return formattedGroups.join(', ');
  };

  const isFormValid =
    isValid.name &&
    isValid.credits &&
    isValid.schedule;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const data = {
          nombre: values.name.trim(),
          creditos: parseInt(values.credits),
          horario: formatSchedule(scheduleInputs)
        };
        const cursoResponse = await axios.post(`${apiUrl}/cursos`, data);
        openPopup('Éxito', 'El curso se creó correctamente.', false);
      } catch (error) {
        openPopup('Error', 'Hubo un problema al crear el curso.', true);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setValues({ name: "", credits: "", schedule: [] });
      setModified({ name: false, credits: false, schedule: false });
      setErrors({ name: "", credits: "", schedule: "" });
      setIsValid({ name: false, credits: false, schedule: false });
      setScheduleInputs([{ day: '', block: '' }]);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-3">
        <form className="add-class-form" onSubmit={handleSubmit}>
          <h1>Crear ramo</h1>

          <div className="name-input-container">
            <FormInput
              id={1}
              name="name"
              type="text"
              placeholder="Ramo"
              label="Nombre"
              value={values.name}
              onChange={onChange}
              errorMessage={errors.name}
              className="AddClassForm name"
              required={true}
            />
          </div>

          <div className="credits-input-container">
            <div className="input-header-container">
              <label>Créditos</label>
              <span className="required-span">Obligatorio</span>
            </div>
            <div className="input-container">
              <select
                className={`credits-input ${modified.credits
                  ? (isValid.credits ? 'valid' : 'invalid')
                  : ''
                  }`}
                name="credits"
                value={values.credits}
                onChange={onChange}
              >
                <option value="">--</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>

            </div>
            <span className="error-message">{errors.credits}</span>
          </div>

          <div className="schedule-input-container">
            <div className="input-header-container">
              <label>Horario</label>
              <span className="required-span">Obligatorio</span>

            </div>
            <div className='input-container'>

              {scheduleInputs.map((schedule, index) => (
                <div key={index} className="schedule-input">
                  <select
                    value={schedule.day}
                    onChange={(e) => onScheduleChange(index, 'day', e.target.value)}
                    className={`day-select ${modified.schedule ? (schedule.day ? 'valid' : 'invalid') : ""}`}
                  >
                    <option value="">Día</option>
                    {days.map(day => (
                      <option key={day.initial} value={day.initial}>{day.name}</option>
                    ))}
                  </select>
                  <select
                    value={schedule.block}
                    onChange={(e) => onScheduleChange(index, 'block', e.target.value)}
                    className={`block-select ${modified.schedule ? (schedule.block ? 'valid' : 'invalid') : ""}`}
                  >
                    <option value="">Bloque</option>
                    {blocks.map(block => (
                      <option key={block} value={block}>{block}</option>
                    ))}
                  </select>
                  {index == 0 && (<button
                    type="button"
                    className="boton-2 add"
                    onClick={addScheduleInput}
                  >
                    +
                  </button>)}
                  {index > 0 && (
                    <button
                      type="button"
                      className="boton-2 remove"
                      onClick={() => removeScheduleInput(index)}
                    >
                      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.7628 9H7.63719C7.18864 9 6.82501 9.37295 6.82501 9.833V16.5C6.82501 17.8807 7.91632 19 9.26251 19H14.1375C14.784 19 15.404 18.7366 15.8611 18.2678C16.3182 17.7989 16.575 17.163 16.575 16.5V9.833C16.575 9.37295 16.2114 9 15.7628 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.625 7L13.9191 5.553C13.7541 5.21427 13.4167 5.0002 13.0475 5H10.3526C9.98338 5.0002 9.64596 5.21427 9.48092 5.553L8.77502 7H14.625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.8247 12.333C10.8247 11.9188 10.4889 11.583 10.0747 11.583C9.66047 11.583 9.32469 11.9188 9.32469 12.333H10.8247ZM9.32469 15.666C9.32469 16.0802 9.66047 16.416 10.0747 16.416C10.4889 16.416 10.8247 16.0802 10.8247 15.666H9.32469ZM14.0753 12.333C14.0753 11.9188 13.7396 11.583 13.3253 11.583C12.9111 11.583 12.5753 11.9188 12.5753 12.333H14.0753ZM12.5753 15.666C12.5753 16.0802 12.9111 16.416 13.3253 16.416C13.7396 16.416 14.0753 16.0802 14.0753 15.666H12.5753ZM14.625 6.25C14.2108 6.25 13.875 6.58579 13.875 7C13.875 7.41421 14.2108 7.75 14.625 7.75V6.25ZM16.575 7.75C16.9892 7.75 17.325 7.41421 17.325 7C17.325 6.58579 16.9892 6.25 16.575 6.25V7.75ZM8.77501 7.75C9.18923 7.75 9.52501 7.41421 9.52501 7C9.52501 6.58579 9.18923 6.25 8.77501 6.25V7.75ZM6.82501 6.25C6.4108 6.25 6.07501 6.58579 6.07501 7C6.07501 7.41421 6.4108 7.75 6.82501 7.75V6.25ZM9.32469 12.333V15.666H10.8247V12.333H9.32469ZM12.5753 12.333V15.666H14.0753V12.333H12.5753ZM14.625 7.75H16.575V6.25H14.625V7.75ZM8.77501 6.25H6.82501V7.75H8.77501V6.25Z" fill="currentColor" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <span className="error-message">{modified.schedule ? errors.schedule : ""}</span>
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className={`boton-2 submit-button ${isFormValid ? 'valid' : 'invalid'}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
            <button
              type="button"
              className="boton-2 cancel-button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>

        <Popup
          title={popup.title}
          message={popup.message}
          isOpen={popup.isOpen}
          onClose={closePopup}
          onRetry={handleRetry}
          onFormClose={handleFormClose}
          isError={popup.isError}
        />
      </div>
    </div>
  );
};

export default AddClassForm;