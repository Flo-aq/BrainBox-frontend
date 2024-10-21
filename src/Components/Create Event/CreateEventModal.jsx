import React, { useState } from 'react';
import './Modal.css'; // Add your CSS for styling

const EventModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [personas, setPersonas] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [notas, setNotas] = useState('');
    const [ponderacion, setPonderacion] = useState('');
    const [ramo, setRamo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateEvent({ eventName, eventType, personas, fecha, hora, notas, ponderacion, ramo });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setEventName('');
        setEventType('');
        setPersonas('');
        setFecha('');
        setHora('');
        setNotas('');
        setPonderacion('');
        setRamo('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name of Event:
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Type of Event:
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
                    </label>
                    <label>
                        Add personas:
                        <input
                            type="text"
                            value={personas}
                            onChange={(e) => setPersonas(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        fecha:
                        <input
                            type="fecha"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        hora:
                        <input
                            type="hora"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ponderación:
                        <input
                            type="number"
                            value={ponderacion}
                            onChange={(e) => setPonderacion(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Ramo:
                        <input
                            type="text"
                            value={ramo}
                            onChange={(e) => setRamo(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        notas:
                        <textarea
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        />
                    </label>
                    <button type="submit">Create Event</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EventModal;

