import axios from 'axios';

const TECHNICIEN_API_BASE_URL = 'https://localhost:7233/api/Techniciens';

class TechnicienService {
  // Récupérer tous les techniciens
  getTechniciens() {
    return axios.get(TECHNICIEN_API_BASE_URL);
  }

  // Récupérer un technicien par ID
  getTechnicienById(id) {
    return axios.get(`${TECHNICIEN_API_BASE_URL}/${id}`);
  }

  // Créer un nouveau technicien
  createTechnicien(technicien) {
    return axios.post(TECHNICIEN_API_BASE_URL, technicien);
  }

  // Mettre à jour un technicien existant
  updateTechnicien(id, technicien) {
    return axios.put(`${TECHNICIEN_API_BASE_URL}/${id}`, technicien);
  }

  // Supprimer un technicien
  deleteTechnicien(id) {
    return axios.delete(`${TECHNICIEN_API_BASE_URL}/${id}`);
  }
}

export default new TechnicienService();
