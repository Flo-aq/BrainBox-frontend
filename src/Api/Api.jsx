import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Clase ApiClient que acepta el token y el studentId como parámetros
class ApiClient {
  constructor(token) {
    if (!token) {
      throw new Error('Token is missing');
    }

    this.token = token;
    this.studentId = jwtDecode(token).sub;  // Decodificamos el token y obtenemos el ID del estudiante
    this.axiosConfig = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      validateStatus: (status) => status < 500,
    });
  }

  /**
   * Eventos
   */
  async createEvento(formValues) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.post('/eventos', formValues, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getEvento(eventoId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/eventos/${eventoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Invitaciones
   */
  async createInvitacion(formValues) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.post('/invitaciones', formValues, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getInvitacionesEstudiante(estudianteId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/invitaciones/estudiante/${estudianteId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getInvitacionesEvento(eventoId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/invitaciones/evento/${eventoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Cursos
   */
  async getCursos() {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get('/cursos', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getCurso(cursoId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/cursos/${cursoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getCursosEstudiante(estudianteId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/cursos/estudiante/${estudianteId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  /**
   * Tareas y Evaluaciones
   */
  async getEvaluacionesCurso(cursoId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/evaluaciones/curso/${cursoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getTareasEntregasCurso(cursoId) {
    if (!this.token) throw new Error('Token is missing');
    return this.axiosConfig.get(`/tareas_entregas/curso/${cursoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}

export const parseErrors = (response) => {
  const { error, errors } = response.data;
  let errorMessage = `${error}. `;
  if (errors) {
    errorMessage += Object.values(errors).join('. ');
  }
  throw new Error(errorMessage);
};

export default ApiClient;
