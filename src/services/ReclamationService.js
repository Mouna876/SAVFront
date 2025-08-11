import axios from 'axios';

const RECLAMATION_API_BASE_URL = 'https://localhost:7233/api/reclamations';

class ReclamationService {
  getReclamations() {
    return axios.get(RECLAMATION_API_BASE_URL);
  }

  getReclamationById(id) {
    return axios.get(`${RECLAMATION_API_BASE_URL}/${id}`);
  }

  createReclamation(reclamation) {
    return axios.post(RECLAMATION_API_BASE_URL, reclamation);
  }

  updateReclamation(id, reclamation) {
    return axios.put(`${RECLAMATION_API_BASE_URL}/${id}`, reclamation);
  }

  deleteReclamation(id) {
    return axios.delete(`${RECLAMATION_API_BASE_URL}/${id}`);
  }
}

export default new ReclamationService();