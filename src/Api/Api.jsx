import axios from 'axios';

// Clase ApiClient que acepta el userId como parámetro
class ApiClient {
  constructor(userId) {
    if (!userId) {
      throw new Error('userId is missing');
    }

    this.userId = userId;
    this.axiosConfig = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      validateStatus: (status) => status < 500,
    });
  }

  /**
   * Invitaciones
   */
  async createInvitacion(formValues) {
    return this.axiosConfig.post('/invitaciones', formValues, {
      headers: { 'X-User-Id': this.userId },
    });
  }

  /**
   * Eventos
   */
  async createEvento(formValues) {
    return this.axiosConfig.post('/eventos', formValues, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }


  async getEvento(eventoId) {
    return this.axiosConfig.get(`/eventos/${eventoId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }



  async getInvitacionesEstudiante(estudianteId) {
    return this.axiosConfig.get(`/invitaciones/estudiante/${estudianteId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }

  async getInvitacionesEvento(eventoId) {
    return this.axiosConfig.get(`/invitaciones/evento/${eventoId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }

  /**
   * Cursos
   */
  async getCursos() {
    return this.axiosConfig.get('/cursos', {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }

  async getCurso(cursoId) {
    return this.axiosConfig.get(`/cursos/${cursoId}`);
  }

  async getCursosEstudiante(estudianteId) {
    return this.axiosConfig.get(`/cursos/estudiante/${estudianteId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }

  /**
   * Tareas y Evaluaciones
   */
  async getEvaluacionesCurso(cursoId) {
    return this.axiosConfig.get(`/evaluaciones/curso/${cursoId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
    });
  }

  async getTareasEntregasCurso(cursoId) {
    return this.axiosConfig.get(`/tareas_entregas/curso/${cursoId}`, {
      headers: { 'X-User-Id': this.userId },  // Usamos un header para el userId
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
