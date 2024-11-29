import React, { useState } from 'react';
import FormInput from '../../FormInput/FormInput';
import TimeInput from '../../TimeInput/TimeInput';
import './CreateEventForm.css';
import { isThisHour, isAfter, isSameDay, getDate, getMonth, getYear, isBefore, intervalToDuration, addMinutes } from 'date-fns';
import Popup from '../../PopUp/PopUp';
import axios from 'axios';

const CreateEventForm = ({ isOpen, onClose }) => {
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });

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
    handleSubmit(); // Intenta enviar el formulario de nuevo
  };

  const [values, setValues] = useState({
    name: "",
    startDate: "",
    startTime: "",
    startTimeHour: "--",
    startTimeMinutes: "--",
    startTimePeriod: "--",
    endDate: "",
    endTime: "",
    endTimeHour: "--",
    endTimeMinutes: "--",
    endTimePeriod: "--",
    class: "",
    notes: "",
  });

  const [isValid, setIsValid] = useState({});
  const [errors, setErrors] = useState({});

  const [isAllDay, setIsAllDay] = useState(false);

  const [modified, setModified] = useState({});

  const classes = ["Select a class", "class1", "class2", "class3"];

  const nameInput = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Estudiar para I1 calculo",
      label: "Nombre",
      required: true,
      errorMessage: "El nombre no puede ser vacío",
    },
  ];

  const startDateInput = [
    {
      id: 2,
      name: "startDate",
      type: "date",
      placeholder: "",
      label: "Fecha",
      required: true,

    },
  ];

  const endDateInput = [
    {
      id: 3,
      name: "endDate",
      type: "date",
      placeholder: "",
      label: "",
      required: true,
    },
  ];



  const validateTimePart = (type, value) => {
    if (value === "--") return "Este campo es requerido";

    if (type === "hour") {
      const hour = parseInt(value);
      if (hour < 1 || hour > 12) return "Hora inválida";
    }
    else if (type === "minutes") {
      const minutes = parseInt(value);
      if (minutes < 0 || minutes > 59) return "Minutos inválidos";
    }
    else if (type === "period") {
      if (!["AM", "PM"].includes(value)) return "Período inválido";
    }

    return "";
  };

  const convertTo24Hour = (hour, period) => {
    hour = parseInt(hour);
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    return hour;
  };

  const validateEndTime = (values, updatedValueString, updatedValue) => {
    const startDate = updatedValueString === "startDate" ? updatedValue : values.startDate;
    const endDate = updatedValueString === "endDate" ? updatedValue : values.endDate;
    if (values.startDate && values.endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const isSameDate = isSameDay(endDateObj, startDateObj);

      const endTimeHour = updatedValueString === "endTimeHour" ? updatedValue : values.endTimeHour;
      const startTimeHour = updatedValueString === "startTimeHour" ? updatedValue : values.startTimeHour;

      const endTimeMinutes = updatedValueString === "endTimeMinutes" ? updatedValue : values.endTimeMinutes;
      const startTimeMinutes = updatedValueString === "startTimeMinutes" ? updatedValue : values.startTimeMinutes;

      const endTimePeriod = updatedValueString === "endTimePeriod" ? updatedValue : values.endTimePeriod;
      const startTimePeriod = updatedValueString === "startTimePeriod" ? updatedValue : values.startTimePeriod;

      const areBothTimesFull = endTimeHour && endTimeMinutes && endTimePeriod && startTimeHour && startTimeMinutes && startTimePeriod;

      if (isSameDate && areBothTimesFull) {
        const startTimeHourFull = convertTo24Hour(startTimeHour, startTimePeriod);
        const endTimeHourFull = convertTo24Hour(endTimeHour, endTimePeriod);

        const startDay = getDate(startDateObj);
        const startMonth = getMonth(startDateObj);
        const startYear = getYear(startDateObj);

        const endDay = getDate(endDateObj);
        const endMonth = getMonth(endDateObj);
        const endYear = getYear(endDateObj);

        const startDateWithTime = new Date(startYear, startDay, startMonth, startTimeHourFull, startTimeMinutes);
        const endDateWithTime = new Date(endYear, endDay, endMonth, endTimeHourFull, endTimeMinutes);

        return !isBefore(endDateWithTime, startDateWithTime);
      }
    }
    return true;
  };



  const onChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name == "name") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : "El nombre no puede ser vacío"
      }));
    }


    if (e.target.className.includes("startTime")) {
      const updatedHour = name === "startTimeHour" ? value : values.startTimeHour;
      const updatedMinutes = name === "startTimeMinutes" ? value : values.startTimeMinutes;
      const updatedPeriod = name === "startTimePeriod" ? value : values.startTimePeriod;

      // Marcar todos los campos de tiempo como modificados cuando se modifica cualquiera
      setModified(prev => ({
        ...prev,
        startTimeHour: true,
        startTimeMinutes: true,
        startTimePeriod: true
      }));

      // Validate individual parts
      const hourError = validateTimePart("hour", updatedHour);
      const minutesError = validateTimePart("minutes", updatedMinutes);
      const periodError = validateTimePart("period", updatedPeriod);
      const isTimeValid = !hourError && !minutesError && !periodError;

      // Update individual field validations
      setErrors(prevErrors => ({
        ...prevErrors,
        startTimeHour: hourError,
        startTimeMinutes: minutesError,
        startTimePeriod: periodError
      }));

      setIsValid(prevIsValid => ({
        ...prevIsValid,
        startTimeHour: !hourError,
        startTimeMinutes: !minutesError,
        startTimePeriod: !periodError
      }));


      if (isTimeValid) {
        setValues(prevValues => ({
          ...prevValues,
          startTime: `${updatedHour}:${updatedMinutes} ${updatedPeriod}`,
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          startTime: ""
        }));

        setIsValid(prevIsValid => ({
          ...prevIsValid,
          startTime: true
        }));
        const isEndTimeValid = validateEndTime(values, name, value);
        if (isEndTimeValid) {
          setValues(prevValues => ({
            ...prevValues,
            endTime: `${values.endTimeHour}:${values.endTimeMinutes} ${values.endTimePeriod}`
          }));

          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: ""
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: true
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: "EndTime no puede ser despues que StartTime"
          }));

          setValues(prevValues => ({
            ...prevValues,
            endTime: "",
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: false
          }));
        }
      } else {
        setValues(prevValues => ({
          ...prevValues,
          startTime: "",
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          startTime: "StartTime no está completo"
        }));

        setIsValid(prevIsValid => ({
          ...prevIsValid,
          startTime: false
        }));
      }
    }

    if (e.target.className.includes("endTime")) {

      const updatedHour = name === "endTimeHour" ? value : values.endTimeHour;
      const updatedMinutes = name === "endTimeMinutes" ? value : values.endTimeMinutes;
      const updatedPeriod = name === "endTimePeriod" ? value : values.endTimePeriod;

      // Marcar todos los campos de tiempo como modificados cuando se modifica cualquiera
      setModified(prev => ({
        ...prev,
        endTimeHour: true,
        endTimeMinutes: true,
        endTimePeriod: true
      }));

      // Validate individual parts
      const hourError = validateTimePart("hour", updatedHour);
      const minutesError = validateTimePart("minutes", updatedMinutes);
      const periodError = validateTimePart("period", updatedPeriod);
      const isTimeValid = !hourError && !minutesError && !periodError;

      // Update individual field validations
      setErrors(prevErrors => ({
        ...prevErrors,
        endTimeHour: hourError,
        endTimeMinutes: minutesError,
        endTimePeriod: periodError,
      }));

      setIsValid(prevIsValid => ({
        ...prevIsValid,
        endTimeHour: !hourError,
        endTimeMinutes: !minutesError,
        endTimePeriod: !periodError
      }));

      if (isTimeValid) {
        const isEndTimeValid = validateEndTime(values, name, value);

        if (isEndTimeValid) {
          setValues(prevValues => ({
            ...prevValues,
            endTime: `${updatedHour}:${updatedMinutes} ${updatedPeriod}`
          }));

          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: ""
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: true
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: "EndTime no puede ser despues que StartTime"
          }));

          setValues(prevValues => ({
            ...prevValues,
            endTime: "",
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: false
          }));
        }

      } else {
        setValues(prevValues => ({
          ...prevValues,
          endTime: "",
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          endTime: "endTime no está completo"
        }));

        setIsValid(prevIsValid => ({
          ...prevIsValid,
          endTime: false
        }));
      }
    }

    if (name === "startDate") {
      // Si startDate tiene un valor, validamos endDate

      if (value && values.endDate) {
        const startDateObj = new Date(value);
        const endDateObj = new Date(values.endDate);
        const isEndDateValid = isAfter(endDateObj, startDateObj) || isSameDay(endDateObj, startDateObj);

        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          endDate: isEndDateValid,
        }));

        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: isEndDateValid ? "" : "endDate no puede ser antes de startDate",
        }));
      }

      if (!value) {
        if (values.endDate) {
          setIsValid((prevIsValid) => ({
            ...prevIsValid,
            endDate: true,
          }));

          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "",
          }));
        }
      } else {
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          [name]: true,
        }));

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));

        const isEndTimeValid = validateEndTime(values, name, value);
        if (isEndTimeValid) {
          setValues(prevValues => ({
            ...prevValues,
            endTime: `${values.endTimeHour}:${values.endTimeMinutes} ${values.endTimePeriod}`
          }));

          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: ""
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: true
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            endTime: "EndTime no puede ser despues que StartTime"
          }));

          setValues(prevValues => ({
            ...prevValues,
            endTime: "",
          }));

          setIsValid(prevIsValid => ({
            ...prevIsValid,
            endTime: false
          }));
        }
      }
    }

    // Validación de endDate cuando se cambia
    if (name === "endDate") {
      // Si startDate tiene un valor, validamos endDate
      if (values.startDate) {
        const startDateObj = new Date(values.startDate);
        const endDateObj = new Date(value);
        const isEndDateValid = isAfter(endDateObj, startDateObj) || isSameDay(endDateObj, startDateObj)

        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          endDate: isEndDateValid,
        }));

        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: isEndDateValid ? "" : "EndDate no puede ser antes de startDate",
        }));

        if (isEndDateValid) {
          const isEndTimeValid = validateEndTime(values, name, value);
          if (isEndTimeValid) {
            setValues(prevValues => ({
              ...prevValues,
              endTime: `${values.endTimeHour}:${values.endTimeMinutes} ${values.endTimePeriod}`
            }));

            setErrors(prevErrors => ({
              ...prevErrors,
              endTime: ""
            }));

            setIsValid(prevIsValid => ({
              ...prevIsValid,
              endTime: true
            }));
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              endTime: "EndTime no puede ser despues que StartTime"
            }));

            setValues(prevValues => ({
              ...prevValues,
              endTime: "",
            }));

            setIsValid(prevIsValid => ({
              ...prevIsValid,
              endTime: false
            }));
          }
        }
      } else {
        if (value) {
          setIsValid((prevIsValid) => ({
            ...prevIsValid,
            [name]: true,
          }));

          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
      }
    }

    if (e.target.type === 'date') {
      if (!value) {
        // Si el input está vacío, se marca como inválido
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          [name]: false,
        }));

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Este campo es obligatorio",
        }));
      }
    }
  };

  const isFormValid = isAllDay
    ? Object.values(errors).every((error, name) => (name === "name" || name === "startDate") ? error === "" : true) &&
    nameInput.every(input => values[input.name] !== "") && startDateInput.every(input => values[input.name] !== "")
    : Object.values(errors).every((error) => error === "") &&
    [...nameInput, ...startDateInput, ...endDateInput].every((input) => !input.required || (values[input.name] !== "")) &&
    values.endTimeHour !== "--" && values.endTimeMinutes !== "--" && values.endTimePeriod !== "--" &&
    values.startTimeHour !== "--" && values.startTimeMinutes !== "--" && values.startTimePeriod !== "--";


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const startDateObj = new Date(values.startDate);
      const endDateObj = isAllDay ? null : new Date(values.endDate);

      const startDateWithTime = isAllDay ? new Date(getYear(startDateObj) - 1, getMonth(startDateObj) + 1, getDate(startDateObj) + 1, 0, 0, 0) : new Date(getYear(startDateObj) - 1, getMonth(startDateObj) + 1, getDate(startDateObj) + 1, convertTo24Hour(values.startTimeHour, values.startTimePeriod), values.startTimeMinutes);
      const endDateWithTime = isAllDay ? addMinutes(new Date(getYear(startDateObj) - 1, getMonth(startDateObj) + 1, getDate(startDateObj) + 1, 0, 0, 0), 1439) : new Date(getYear(endDateObj) - 1, getMonth(endDateObj) + 1, getDate(endDateObj) + 1, convertTo24Hour(values.endTimeHour, values.endTimePeriod), values.endTimeMinutes);

      const description = (values.class && values.notes)
        ? `${values.class} - ${values.notes}`
        : values.class || values.notes || "";
      try {
        // Primero crear el evento
        const eventoResponse = await axios.post(`${apiUrl}/eventos`, {
          fecha_inicio: startDateWithTime,
          fecha_fin: endDateWithTime,
          nombre: nombre,
          descripcion: description,
        });

        // Crear invitación después de la creación del evento
        const invitacionResponse = await axios.post(`${apiUrl}/invitaciones`, {
          estudiante_ID: apiClient.userId,
          evento_ID: eventoResponse.data.id,
          estado: true,
          tarea_entrega_id: null
        });

        // Almacenar el evento creado y mostrar el popup
        openPopup('Éxito', 'El evento se creó correctamente.', false);
      } catch (error) {
        openPopup('Error', 'Hubo un problema al crear el evento.', true);
      }
    }
  }

  const toggleAllDay = () => {
    setIsAllDay(!isAllDay);
  };

  const isTimeInputsDisabled = !values.startDate || !values.endDate || errors.startDate || errors.endDate;



  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className={`create-event-form ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`} onSubmit={handleSubmit}>
          <h1>Crear Evento</h1>
          <div className="name-input-container">
            {nameInput.map((input) => (
              <FormInput
                {...input}
                key={input.id}
                value={values[input.name]}
                onChange={onChange}
                className={`CreateEventForm ${input.name}`}
                errorMessage={errors[input.name]}
              />
            ))}
          </div>

          <div className="date-input-container">
            {startDateInput.map((input) => (
              <FormInput
                {...input}
                key={input.id}
                value={values[input.name]}
                onChange={onChange}
                className={`CreateEventForm ${input.name}`}
                errorMessage={errors[input.name]}
                show={isAllDay ? 'isAllDay' : 'notIsAllDay'}
              />
            ))}
            <span className={`time-divider ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>to</span>
            {endDateInput.map((input) => (
              <FormInput
                {...input}
                key={input.id}
                value={values.endDate}
                onChange={onChange}
                className={`CreateEventForm ${input.name}`}
                errorMessage={errors[input.name]}
                show={isAllDay ? 'isAllDay' : 'notIsAllDay'}
              />
            ))}
          </div>

          <div className={`hour-input-container ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>
            <div className="input-header-container">
              <label>Hora</label>
              <span className="required-span">Obligatorio</span>
            </div>
            <div className="input-container">
              <TimeInput name="startTime"
                disabled={isTimeInputsDisabled}
                onChange={onChange}
                errors={{
                  startTimeHour: errors.startTimeHour,
                  startTimeMinutes: errors.startTimeMinutes,
                  startTimePeriod: errors.startTimePeriod
                }}
                modified={{
                  startTimeHour: modified.startTimeHour,
                  startTimeMinutes: modified.startTimeMinutes,
                  startTimePeriod: modified.startTimePeriod
                }} />

              <span className="time-divider">to</span>
              <TimeInput name="endTime"
                disabled={isTimeInputsDisabled}
                onChange={onChange}
                errors={{
                  endTimeHour: errors.endTimeHour,
                  endTimeMinutes: errors.endTimeMinutes,
                  endTimePeriod: errors.endTimePeriod
                }}
                modified={{
                  endTimeHour: modified.endTimeHour,
                  endTimeMinutes: modified.endTimeMinutes,
                  endTimePeriod: modified.endTimePeriod
                }} />

            </div>
            <div className="error-container">
              <span className="errorMessageStartTime">{isTimeInputsDisabled ? "" : errors.startTime}</span>
              <span className="errorMessageEndTime">{isTimeInputsDisabled ? "" : errors.endTime}</span>
            </div>
          </div>



          <div className={`class-input-container ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>
            <div className="input-header-container">
              <label>Ramo</label>
            </div>
            <div className="input-container">
              <select
                className="class-input"
                name="class"
                value={values.class}
                onChange={onChange}
              >
                {classes.map((classOption) => (
                  <option key={classOption} value={classOption}>
                    {classOption}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div className={`notes-input-container ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>
            <div className="input-header-container">
              <label>Notas</label>
            </div>
            <div className="input-container">
              <textarea
                className="notes-input"
                name="notes"
                value={values.notes}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          <div className={`all-day-input-container ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>
            <div className="input-header-container">
              <label>Todo el día</label>
            </div>
            <div className="input-container">
              <input
                type="checkbox"
                className="all-day-input"
                name="allDay"
                checked={isAllDay}
                onChange={toggleAllDay}
              />
            </div>
          </div>

          <div className={`form-buttons ${isAllDay ? 'isAllDay' : 'notIsAllDay'}`}>
            <button type="submit" className={`boton-2 submit-button ${isFormValid ? 'valid' : 'invalid'}`} disabled={!isFormValid}>
              Crear
            </button>
            <button type="button" className="boton-2 cancel-button" onClick={onClose}>
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

export default CreateEventForm;
