import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClassCard from '../../Components/UserClasses/ClassCard';
import AddClassModal from '../../Components/UserClasses/AddClassModal';
import './UserClasses.css'

const UserClasses = () => {
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';
  const userId = 1; // TODO change user id
  // TODO uncomment api 
  const userclasses = [{
    "id": 1,
    "nombre": "Tecnologia y Aplicaciones Web",
    "creditos": 10,
    "horario": "M-J:2, V:4",
    "createdAt": "2024-11-10T19:19:17.200Z",
    "updatedAt": "2024-11-10T19:19:17.200Z"
}];

const allclasses = [{
  "id": 1,
  "nombre": "Tecnologia y Aplicaciones Web",
  "creditos": 10,
  "horario": "M-J:2, V:4",
  "createdAt": "2024-11-10T19:19:17.200Z",
  "updatedAt": "2024-11-10T19:19:17.200Z"
},{
  "id": 2,
  "nombre": "Arquitectura de Sistemas de Software",
  "creditos": 10,
  "horario": "L:5-6, V:3",
  "createdAt": "2024-11-10T19:22:50.992Z",
  "updatedAt": "2024-11-10T19:22:50.992Z"
}]


  // const [userClasses, setUserClasses] = useState([]);
  // const [allClasses, setAllClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchUserClasses = async () => {
  //     const cursosResponse = await axios.get(`${apiUrl}/cursos/estudiante/${userId}`);
  //     const classesData = await Promise.all(cursosResponse.data.map(course => axios.get(`${apiUrl}/cursos/${course.id}`)));
  //     setUserClasses(classesData.map(response => response.data));
  //   };

  //   const fetchAllClasses = async () => {
  //     const response = await axios.get(`${apiUrl}/cursos`);
  //     setAllClasses(response.data);
  //   };

  //   fetchUserClasses();
  //   fetchAllClasses();
  // }, []);

  const handleAddClass = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="user-classes">
      <h1>Your Classes</h1>
      <div className="classes">
        {userclasses.map(course => <ClassCard key={course.id} course={course} />)}
        <div className="add-class-card" >
            <button className='add-class' onClick={handleAddClass}>
              +
            </button>
        </div>
      </div>
      {isModalOpen && <AddClassModal allClasses={allclasses} userClasses={userclasses} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default UserClasses;