import React, { useEffect, useState } from 'react';
import { addHours, addMinutes, format, formatDistanceStrict, getDate, getMinutes, getMonth, getYear, toDate } from 'date-fns';
import { differenceInMinutes } from 'date-fns';
import './EditEvTaskModal.css'
import Popup from '../../PopUp/PopUp';
import axios from 'axios';

const EditEvTaskModal = ({ event, onClose }) => {
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });
  const openPopup = (title, message, isError = false) => {
    setPopup({ isOpen: true, title, message, isError });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, title: '', message: '', isError: false });
  };



  const durationMinutes = differenceInMinutes(event.endDate, event.startDate);
  const startDate = `${format(event.startDate, 'PP')}`;
  const endDate = (getDate(event.startDate) === getDate(event.endDate) && getMonth(event.startDate) === getMonth(event.endDate) && getYear(event.startDate) === getYear(event.endDate)) ? startDate : format(event.endDate, 'PP');
  const startTime = (durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59)) ? "All day" : format(event.startDate, 'p');
  const endTime = (durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59)) ? null : format(event.endDate, 'p');
  const name = event.name;
  const weight = `${event.weight * 100} %`;

  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameStatus, setNameStatus] = useState('neutral');
  const [errorName, setErrorName] = useState('');

  const [isStartDateModalOpen, setStartDateModalOpen] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [startDateStatus, setStartDateStatus] = useState('neutral');
  const [errorStartDate, setErrorStartDate] = useState('');

  const [isStartTimeModalOpen, setStartTimeModalOpen] = useState(false);
  const [newStartHour, setNewStartHour] = useState('');
  const [newStartMinute, setNewStartMinute] = useState('');
  const [newStartPeriod, setNewStartPeriod] = useState('');
  const [startTimeStatus, setStartTimeStatus] = useState('neutral');
  const [errorStartTime, setErrorStartTime] = useState('');

  const [isEndDateModalOpen, setEndDateModalOpen] = useState(false);
  const [newEndDate, setNewEndDate] = useState('');
  const [endDateStatus, setEndDateStatus] = useState('neutral');
  const [errorEndDate, setErrorEndDate] = useState('');

  const [isEndTimeModalOpen, setEndTimeModalOpen] = useState(false);
  const [newEndHour, setNewEndHour] = useState('');
  const [newEndMinute, setNewEndMinute] = useState('');
  const [newEndPeriod, setNewEndPeriod] = useState('');
  const [endTimeStatus, setEndTimeStatus] = useState('neutral');
  const [errorEndTime, setErrorEndTime] = useState('');

  const [isWeightModalOpen, setWeightModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [weightStatus, setWeightStatus] = useState('neutral');
  const [errorWeight, setErrorWeight] = useState('');

  const resetNameFields = () => {
    setNewName('');
    setNameStatus('neutral');
    setErrorName('');
  };

  const resetStartDateFields = () => {
    setNewStartDate('');
    setStartDateStatus('neutral');
    setErrorStartDate('');
  };

  const resetStartTimeFields = () => {
    setNewStartHour('');
    setNewStartMinute('');
    setNewStartPeriod('');
    setStartTimeStatus('neutral');
    setErrorStartTime('');
  };

  const resetEndDateFields = () => {
    setNewEndDate('');
    setEndDateStatus('neutral');
    setErrorEndDate('');
  };

  const resetEndTimeFields = () => {
    setNewEndHour('');
    setNewEndMinute('');
    setNewEndPeriod('');
    setEndTimeStatus('neutral');
    setErrorEndTime('');
  };

  const resetWeightFields = () => {
    setNewWeight('');
    setWeightStatus('neutral');
    setErrorWeight('');
  };

  useEffect(() => {
    if (!isNameModalOpen) resetNameFields();
  }, [isNameModalOpen]);

  useEffect(() => {
    if (!isStartDateModalOpen) resetStartDateFields();
  }, [isStartDateModalOpen]);

  useEffect(() => {
    if (!isStartTimeModalOpen) resetStartTimeFields();
  }, [isStartTimeModalOpen]);

  useEffect(() => {
    if (!isEndDateModalOpen) resetEndDateFields();
  }, [isEndDateModalOpen]);

  useEffect(() => {
    if (!isEndTimeModalOpen) resetEndTimeFields();
  }, [isEndTimeModalOpen]);

  useEffect(() => {
    if (!isWeightModalOpen) resetWeightFields();
  }, [isWeightModalOpen]);

  const validateStartDate = (dateString) => {
    if (!dateString) {
      setStartDateStatus('invalid');
      setErrorStartDate('La fecha no puede estar vacía');
      return false;
    }

    const newDate = new Date(dateString);
    if (isSameDay(newDate, new Date(getYear(event.startDate), getMonth(event.startDate), getDate(event.startDate), 0, 0, 0))) {
      setStartDateStatus('invalid');
      setErrorStartDate('La fecha no puede ser la misma que la original');
      return false;
    }

    // Check if the new date is after the end date (ignoring time)
    if (isAfter(newDate, new Date(getYear(event.endDate), getMonth(event.endDate), getDate(event.endDate), 0, 0, 0))) {
      setStartDateStatus('invalid');
      setErrorStartDate('La fecha de inicio no puede ser después de la fecha de fin');
      return false;
    }
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (isAfter(addMinutes(addHours(new Date(dateString), getHours(startDate)), getMinutes(startDate)), endDate)) {
      setStartDateStatus('invalid');
      setErrorStartDate('La fecha de inicio no puede ser después de la fecha de fin');
      return false;
    }

    setStartDateStatus('valid');
    setErrorStartDate('');
    return true;
  };

  const validateEndDate = (dateString) => {
    if (!dateString) {
      setEndDateStatus('invalid');
      setErrorEndDate('La fecha no puede estar vacía');
      return false;
    }

    const newDate = new Date(dateString);
    if (isSameDay(newDate, new Date(getYear(event.endDate), getMonth(event.endDate), getDate(event.endDate), 0, 0, 0))) {
      setEndDateStatus('invalid');
      setErrorEndDate('La fecha no puede ser la misma que la original');
      return false;
    }

    // Check if the new date is after the end date (ignoring time)
    if (isBefore(newDate, new Date(getYear(event.startDate), getMonth(event.startDate), getDate(event.startDate), 0, 0, 0))) {
      setEndDateStatus('invalid');
      setErrorEndDate('La fecha de fin no puede ser antes de la fecha de inicio');
      return false;
    }
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (isBefore(addMinutes(addHours(new Date(dateString), getHours(endDate)), getMinutes(endDate)), startDate)) {
      setEndDateStatus('invalid');
      setErrorEndDate('La fecha de fin no puede ser antes de la fecha de inicio');
      return false;
    }

    setEndDateStatus('valid');
    setErrorEndDate('');
    return true;
  };

  const validateStartTime = () => {
    // Check if any select is null
    if (!newStartHour || !newStartMinute || !newStartPeriod) {
      setStartTimeStatus('invalid');
      setErrorStartTime('Ningun campo puede ser vacío');
      return false;
    }

    // Convert to 24-hour format for comparison
    const currentStartTime = format(event.startDate, 'p');
    const newTimeString = `${newStartHour}:${newStartMinute} ${newStartPeriod}`;

    // If the time is exactly the same as current start time, it's invalid
    if (newTimeString === currentStartTime) {
      setStartTimeStatus('invalid');
      setErrorStartTime('La hora no puede ser igual a la original');
      return false;
    }

    // If start and end dates are the same day, additional validation
    if (isSameDay(event.startDate, event.endDate)) {
      const endTime = toDate(format(event.endTime, "p"));
      const startTime = toDate(newTimeString);

      if (isAfter(startTime, endTime)) {
        setStartTimeStatus('invalid');
        setErrorStartTime('La fecha de inicio no puede ser después que la fecha de fin');
        return false;
      }
    }
    setStartTimeStatus('valid');
    setErrorStartTime('');
    return true;
  };

  const validateEndTime = () => {
    // Check if any select is null
    if (!newEndHour || !newEndMinute || !newEndPeriod) {
      setEndTimeStatus('invalid');
      setErrorEndTime('Ningún campo puede ser vacío');
      return false;
    }

    // Convert to 24-hour format for comparison
    const currentEndTime = format(event.endDate, 'p');
    const newTimeString = `${newEndHour}:${newEndMinute} ${newEndPeriod}`;

    // If the time is exactly the same as current end time, it's invalid
    if (newTimeString === currentEndTime) {
      setEndTimeStatus('invalid');
      setErrorEndTime('La hora no puede ser igual a la original');
      return false;
    }

    // If start and end dates are the same day, additional validation
    if (isSameDay(event.startDate, event.endDate)) {
      const startTime = toDate(format(event.startDate, "p"));
      const endTime = toDate(newTimeString);

      if (isBefore(endTime, startTime)) {
        setEndTimeStatus('invalid');
        setErrorEndTime('La fecha de fin no puede ser antes que la fecha de inicio');
        return false;
      }
    }
    setEndTimeStatus('valid');
    setErrorEndTime("")
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewName(value);
    if (value === '') {
      setNameStatus('invalid');
      setErrorName("El nombre no puede ser vacío");
    } else if (value === event.name) {
      setNameStatus('invalid');
      setErrorName("El nombre no puede ser igual al original");
    } else {
      setNameStatus('valid');
      setErrorName("");
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setNewStartDate(value);
    validateStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setNewEndDate(value);
    validateEndDate(value);
  };

  const handleStartTimeChange = (type, value) => {
    switch (type) {
      case 'hour':
        setNewStartHour(value);
        break;
      case 'minute':
        setNewStartMinute(value);
        break;
      case 'period':
        setNewStartPeriod(value);
        break;
    }
    validateStartTime();
  };

  const handleEndTimeChange = (type, value) => {
    switch (type) {
      case 'hour':
        setNewEndHour(value);
        break;
      case 'minute':
        setNewEndMinute(value);
        break;
      case 'period':
        setNewEndPeriod(value);
        break;
    }
    validateEndTime();
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setNewWeight(value);

    if (value === '') {
      setWeightStatus('invalid');
      setErrorWeight("La ponderación no puede ser vacía");
    } else if (value < 0 || value > 100 || value === event.weight) {
      setWeightStatus('invalid');
      setErrorWeight("La ponderación tiene que estar entre 0 y 100");
    } else {
      setWeightStatus('valid');
      setErrorWeight("");
    }
  };

  const handleNameConfirm = async (e) => {
    if (nameStatus === 'valid') {
      // Update event name logic here
      try {
        const type = event.type;
        if (type === "task") {
          const changeResponse = await axios.put(`https://grupo5-backend-24-2-ga6y.onrender.com/tareas_entregas/${event.id}`, {
            nombre: newName,
          })
        } else {
          const changeResponse = await axios.put(`https://grupo5-backend-24-2-ga6y.onrender.com/evaluaciones/${event.id}`, {
            nombre: newName,
          })
        }
        openPopup('Éxito', 'Se modificó correctamente.', false);
      } catch (error) {
        openPopup('Error', 'Hubo un problema al editar.', true);
      }
      setNameModalOpen(false);
      onClose();
    }
  };

  const handleStartDateConfirm = () => {
    if (startDateStatus === 'valid') {
      // Update event start date logic here
      setStartDateModalOpen(false);
      onClose();
    }
  };

  const handleEndDateConfirm = () => {
    if (startDateStatus === 'valid') {
      // Update event start date logic here
      setEndDateModalOpen(false);
      onClose();
    }
  };

  const handleStartTimeConfirm = () => {
    if (startTimeStatus === 'valid') {
      // Update event start time logic here
      setStartTimeModalOpen(false);
      onClose();
    }
  };

  const handleEndTimeConfirm = () => {
    if (endTimeStatus === 'valid') {
      // Update event end time logic here
      setEndTimeModalOpen(false);
      onClose();
    }
  };


  const handleWeightConfirm = () => {
    if (weightStatus === 'valid') {
      // Update event weight logic here
      setWeightModalOpen(false);
      onClose();
    }
  };

  const handleButtonClick = (title) => {
    if (title === 'Name') {
      setNameModalOpen(true);
    } else if (title === 'Weight') {
      setWeightModalOpen(true);
    } else if (title === 'startDate') {
      setStartDateModalOpen(true);
    } else if (title === 'endDate') {
      setEndDateModalOpen(true);
    } else if (title === 'startTime') {
      setStartTimeModalOpen(true);
    } else if (title === 'endTime') {
      setEndTimeModalOpen(true);
    }
    console.log(`Open modal for ${title}`);
  };

  const handleNameFormClose = () => {
    setNameModalOpen(false);
    resetNameFields();
    closePopup();
    onClose();
  };

  const handleRetryName = () => {
    closePopup();
    handleNameConfirm(); // Intenta enviar el formulario de nuevo
  };

  const handleStartDateFormClose = () => {
    setStartDateModalOpen(false);
    resetStartDateFields();
    closePopup();
    onClose();
  };

  const handleRetryStartDate = () => {
    closePopup();
    handleStartDateConfirm(); // Intenta enviar el formulario de nuevo
  };

  const handleStartTimeFormClose = () => {
    setStartTimeModalOpen(false);
    resetStartTimeFields();
    closePopup();
    onClose();
  };

  const handleRetryStartTime = () => {
    closePopup();
    handleStartTimeConfirm(); // Intenta enviar el formulario de nuevo
  };

  const handleEndDateFormClose = () => {
    setEndDateModalOpen(false);
    resetEndDateFields();
    closePopup();
    onClose();
  };

  const handleRetryEndDate = () => {
    closePopup();
    handleStartDateConfirm(); // Intenta enviar el formulario de nuevo
  };

  const handleEndTimeFormClose = () => {
    setStartTimeModalOpen(false);
    resetStartTimeFields();
    closePopup();
    onClose();
  };

  const handleRetryEndTime = () => {
    closePopup();
    handleStartTimeConfirm(); // Intenta enviar el formulario de nuevo
  };

  const handleWeightFormClose = () => {
    setWeightModalOpen(false);
    resetWeightFields();
    closePopup();
    onClose();
  };

  const handleRetryWeight = () => {
    closePopup();
    handleWeightConfirm(); // Intenta enviar el formulario de nuevo
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));


  return (
    <div className='modal-overlay'>
      <div className='modal-content-5'>
        <div className="edit-ev-task-modal">
          <h1 className='title-modal'>Editar</h1>
          <div className='item-container'>
            <h4>Nombre</h4>
            <p>{name}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('Name')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <h4>Fecha de inicio</h4>
            <p>{startDate}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('startDate')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <h4>Fecha de fin</h4>
            <p>{endDate}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('endDate')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <h4>Hora de inicio</h4>
            <p>{startTime}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('endTime')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <h4>Hora de fin</h4>
            <p>{endTime}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('startTime')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <h4>Ponderación</h4>
            <p>{weight}</p>
            <button className='boton-2 edit' onClick={() => handleButtonClick('Weight')}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
          </div>
          <div className='item-container'>
            <button className='boton-2 close' onClick={onClose}>Close</button>
          </div>


          {isNameModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 name-modal'>
                  <div className='edit-content'>
                    <h4>Nombre</h4>
                    <input
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                      className={nameStatus === 'valid' ? 'valid' : nameStatus === 'invalid' ? 'invalid' : ''}
                    />
                    <div className='error-message'>{errorName}</div>
                    <button className='boton-2 ok' disabled={errorNme != "" ? false : true} onClick={handleNameConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setNameModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryName}
                onFormClose={handleNameFormClose}
                isError={popup.isError}
              />
            </>
          )}

          {isStartDateModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 start-date'>
                  <div className='edit-content'>
                    <h4>Fecha de inicio</h4>
                    <input
                      type="date"
                      value={newStartDate}
                      onChange={handleStartDateChange}
                      className={startDateStatus === 'valid' ? 'valid' : startDateStatus === 'invalid' ? 'invalid' : ''}
                    />
                    <div className='error-message'>{errorStartDate}</div>
                    <button className='boton-2 ok' disabled={errorStartDate != "" ? false : true} onClick={handleStartDateConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setStartDateModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryStartDate}
                onFormClose={handleStartDateFormClose}
                isError={popup.isError}
              />
            </>
          )}

          {isEndDateModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 end-date'>
                  <div className='edit-content'>
                    <h4>Fecha final</h4>
                    <input
                      type="date"
                      value={newEndDate}
                      onChange={handleEndDateChange}
                      className={endDateStatus === 'valid' ? 'valid' : endDateStatus === 'invalid' ? 'invalid' : ''}
                    />
                    <div className='error-message'>{errorEndDate}</div>
                    <button className='boton-2 ok' disabled={errorEndDate != "" ? false : true} onClick={handleEndDateConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setEndDateModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryEndDate}
                onFormClose={handleEndDateFormClose}
                isError={popup.isError}
              />
            </>
          )}

          {isStartTimeModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 start-time'>
                  <div className='edit-content'>
                    <h4>Hora de inicio</h4>
                    <div className="time-selects">
                      <select
                        value={newStartHour}
                        onChange={(e) => handleStartTimeChange('hour', e.target.value)}
                        className={startTimeStatus === 'valid' ? 'valid' : startTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Hour</option>
                        {hourOptions.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                      <span>:</span>
                      <select
                        value={newStartMinute}
                        onChange={(e) => handleStartTimeChange('minute', e.target.value)}
                        className={startTimeStatus === 'valid' ? 'valid' : startTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Min</option>
                        {minuteOptions.map(minute => (
                          <option key={minute} value={minute}>{minute}</option>
                        ))}
                      </select>
                      <span></span>
                      <select
                        value={newStartPeriod}
                        onChange={(e) => handleStartTimeChange('period', e.target.value)}
                        className={startTimeStatus === 'valid' ? 'valid' : startTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Period</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <div className='error-message'>{errorStartTime}</div>
                    <button className='boton-2 ok' disabled={errorStartTime != "" ? false : true} onClick={handleStartTimeConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setStartTimeModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryStartTime}
                onFormClose={handleStartTimeFormClose}
                isError={popup.isError}
              />
            </>
          )}

          {isEndTimeModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 end-time'>
                  <div className='edit-content'>
                    <h4>Hora final</h4>
                    <div className="time-selects">
                      <select
                        value={newEndHour}
                        onChange={(e) => handleEndTimeChange('hour', e.target.value)}
                        className={endTimeStatus === 'valid' ? 'valid' : endTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Hour</option>
                        {hourOptions.map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                      <span>:</span>
                      <select
                        value={newEndMinute}
                        onChange={(e) => handleEndTimeChange('minute', e.target.value)}
                        className={endTimeStatus === 'valid' ? 'valid' : endTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Min</option>
                        {minuteOptions.map(minute => (
                          <option key={minute} value={minute}>{minute}</option>
                        ))}
                      </select>
                      <span></span>
                      <select
                        value={newEndPeriod}
                        onChange={(e) => handleEndTimeChange('period', e.target.value)}
                        className={endTimeStatus === 'valid' ? 'valid' : endTimeStatus === 'invalid' ? 'invalid' : ''}
                      >
                        <option value="">Period</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <div className='error-message'>{errorEndTime}</div>
                    <button className='boton-2 ok' disabled={errorEndTime != "" ? false : true} onClick={handleEndTimeConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setEndTimeModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryEndTime}
                onFormClose={handleEndTimeFormClose}
                isError={popup.isError}
              />
            </>
          )}


          {isWeightModalOpen && (
            <>
              <div className='modal-overlay'>
                <div className='modal-content-6 weight'>
                  <div className='edit-content'>
                    <h4>Ponderación</h4>
                    <input
                      type="number"
                      value={newWeight}
                      onChange={handleWeightChange}
                      className={weightStatus === 'valid' ? 'valid' : weightStatus === 'invalid' ? 'invalid' : ''}
                    />
                    <div className='error-message'>{errorWeight}</div>
                    <button className='boton-2 ok' disabled={errorWeight != "" ? false : true} onClick={handleWeightConfirm}>Submit</button>
                    <button className='boton-2 cancel' onClick={() => setWeightModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
              <Popup
                title={popup.title}
                message={popup.message}
                isOpen={popup.isOpen}
                onClose={closePopup}
                onRetry={handleRetryWeight}
                onFormClose={handleWeightFormClose}
                isError={popup.isError}
              />
            </>
          )}
        </div>
      </div>
    </div>

  );
};

export default EditEvTaskModal;
