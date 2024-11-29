import React, { useEffect, useState } from 'react';
import './AddClassModal.css';

const AddClassModal = ({ allClasses, userClasses, onClose }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setAvailableClasses(allClasses.filter(course => !userClasses.some(userCourse => userCourse.id === course.id)));
  }, [allClasses, userClasses]);

  const handleSelectChange = (e) => {
    setSelectedClass(e.target.value);
    setModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle class addition
    // TODO: Add class with API
    // TODO: Open pop up
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-4">
        {availableClasses.length === 0 ? (
          <div className='add-class-user-content'>
            <h2>No hay más clases para que añadas</h2>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        ) : (
          <form className="add-class-user" onSubmit={handleSubmit}>
            <h2>Add a Class</h2>
            <select value={selectedClass} onChange={handleSelectChange}>
              <option value="" disabled>Select a class</option>
              {availableClasses.map(course => (
                <option key={course.id} value={course.id}>{course.nombre}</option>
              ))}
            </select>
            <div className='buttons'>
              <button className="boton-2 submit" type="submit" disabled={!modified}>Submit</button>
              <button className='boton-2 cancel' type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddClassModal;
