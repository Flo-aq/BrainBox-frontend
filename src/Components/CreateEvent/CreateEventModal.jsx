import React, { useState } from 'react';
import './Modal.css'; // Add your CSS for styling

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [nombreEvento, setNombreEvento] = useState('');
    const [eventType, setEventType] = useState('');
    const [personas, setPersonas] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [notas, setNotas] = useState('');
    const [ponderacion, setPonderacion] = useState('');
    const [ramo, setRamo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateEvent({ nombreEvento, eventType, personas, fecha, hora, notas, ponderacion, ramo });
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setNombreEvento('');
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
                <h2>Crear Evento</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={nombreEvento}
                            onChange={(e) => setNombreEvento(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Tipo:
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
                        + personas:
                        <input
                            type="text"
                            value={personas}
                            onChange={(e) => setPersonas(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Fecha:
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Hora:
                        <input
                            type="time"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </label>

                    {/* Conditionally render "Ponderación" only if the event type is not "Otro" */}
                    {eventType !== "Otro" && (
                        <label>
                            Ponderación:
                            <input
                                type="number"
                                value={ponderacion}
                                onChange={(e) => setPonderacion(e.target.value)}
                                required
                            />
                        </label>
                    )}

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
                        Notas:
                        <textarea
                            value={notas}
                            onChange={(e) => setNotas(e.target.value)}
                        />
                    </label>
                    <button type="submit">Crear Evento</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
                <button onClick={onClose} className="close-button">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default CreateEventModal;
