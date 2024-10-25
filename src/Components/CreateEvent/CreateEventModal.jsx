import React, { useState } from 'react';
import './Modal.css'; // Add your CSS for styling

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventType, setEventType] = useState('');
    const [personas, setPersonas] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [notas, setNotas] = useState('');
    const [ponderacion, setPonderacion] = useState('');
    const [ramo, setRamo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateEvent({ nombreEvento, eventType, personas, fechaInicio, horaInicio, fechaFin, horaFin, notas, ponderacion, ramo });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setNombreEvento('');
        setEventType('');
        setPersonas('');
        setFechaInicio('');
        setHoraInicio('');
        setFechaFin('');
        setHoraFin('');
        setNotas('');
        setPonderacion('');
        setRamo('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Crear Evento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box name-box">
                        <span className="title">
                            Nombre
                            <span className="asterisk">*</span>
                        </span>
                        <input
                            type="text"
                            value={nombreEvento}
                            onChange={(e) => setNombreEvento(e.target.value)}
                            required
                            autofocus
                        />
                    </div>
                    <div className='input-box type-box'>
                        <span className="title">
                            Tipo
                            <span className="asterisk">*</span>
                        </span>
                        <select
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            required
                        >
                            <option value="">Select...</option>
                            <option value="Prueba">Prueba</option>
                            <option value="Tarea">Tarea</option>
                            <option value="Proyecto">Proyecto</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className='input-box add-people-box'>
                        <span className='title'>Añadir personas</span>
                        <textarea
                            value={personas}
                            onChange={(e) => setPersonas(e.target.value)}
                            required
                        />
                    </div>
                    <div className='time-container inicio'>Inicio
                        <div className='input-box date-box inicio'>

                            <span className="title">
                                Fecha
                                <span className="asterisk">*</span>
                            </span>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-box time-box inicio'>
                            <span className="title">
                                Hora
                                <span className="asterisk">*</span>
                            </span>
                            <input
                                type="time"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                                step="900"
                                required
                            />
                        </div></div>

                    <div className='time-container final'> Fin
                        <div className='input-box date-box fin'>
                            <span className="title">
                                Fecha
                                <span className="asterisk">*</span>
                            </span>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-box time-box fin'>
                            <span className="title">
                                Hora
                                <span className="asterisk">*</span>
                            </span>
                            <input
                                type="time"
                                value={horaFin}
                                onChange={(e) => setHoraFin(e.target.value)}
                                step="900"
                                required
                            />
                        </div>
                    </div>

                    {/* Conditionally render "Ponderación" only if the event type is not "Otro" */}

                    <div className='ramo-pond-container'>
                        <div className='input-box pond-box' style={{ display: eventType === 'Otro' ? 'none' : 'grid' }}>
                            <span className="title">
                                Ponderación (%)
                                <span className="asterisk">*</span>
                            </span>
                            <input
                                type="number"
                                value={ponderacion}
                                onChange={(e) => setPonderacion(e.target.value)}
                                required
                            />
                        </div>


                        <div className='input-box class-box' style={{ gridArea: eventType === 'Otro' ? '1 / 1 / 2 / 3 ' : '1 / 1 / 2 / 2' }}>
                            <span className="title">
                                Ramo
                                {eventType !== 'Otro' && <span className="asterisk">*</span>}
                            </span>

                            <input
                                type="text"
                                value={ramo}
                                onChange={(e) => setRamo(e.target.value)}
                                required={eventType !== 'Otro'}
                            />
                        </div></div>

                    <div className='input-box notes-box'>
                        <span className='title'>Notas</span>
                        <textarea
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        />
                    </div>
                    <div className='input-box button-box-1'>
                        <button className='boton-2 submit' type="submit">Crear Evento</button>
                        <button className='boton-2 cancel' type="button" onClick={onClose}>Cancelar</button></div>
                    <div className='button-box-2'>
                        <button onClick={onClose} className="boton-2 close-button">
                            Cerrar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreateEventModal;
