import axios from 'axios';

const INTERVENTION_API_BASE_URL = 'https://localhost:7233/api/Interventions';

class InterventionService {
  getInterventions() {
    return axios.get(INTERVENTION_API_BASE_URL);
  }

  getInterventionById(id) {
    return axios.get(`${INTERVENTION_API_BASE_URL}/${id}`);
  }

  createIntervention(intervention) {
    return axios.post(INTERVENTION_API_BASE_URL, intervention);
  }

  updateIntervention(id, intervention) {
    return axios.put(`${INTERVENTION_API_BASE_URL}/${id}`, intervention);
  }

  deleteIntervention(id) {
    return axios.delete(`${INTERVENTION_API_BASE_URL}/${id}`);
  }

  calculateInvoice(id) {
    return axios.post(`${INTERVENTION_API_BASE_URL}/${id}/CalculateInvoice`);
  }
}

export default new InterventionService();