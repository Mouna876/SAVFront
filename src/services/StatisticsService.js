import axios from 'axios';

const STATISTICS_API_BASE_URL = 'https://localhost:7233/api/Statistiques';

class StatisticsService {
    getTotalReclamations() {
        return axios.get(`${STATISTICS_API_BASE_URL}/total-reclamations`);
    }

    getReclamationPercentageByStatus() {
        return axios.get(`${STATISTICS_API_BASE_URL}/reclamation-percentage`);
    }

    getInterventionsCountByTechnician() {
        return axios.get(`${STATISTICS_API_BASE_URL}/interventions-by-technician`);
    }

    getTotalFacturesHorsGarantie() {
        return axios.get(`${STATISTICS_API_BASE_URL}/total-factures-hors-garantie`);
    }

    getCustomerSatisfactionRate() {
        return axios.get(`${STATISTICS_API_BASE_URL}/customer-satisfaction-rate`);
    }

    getMostReclaimedArticles() {
        return axios.get(`${STATISTICS_API_BASE_URL}/most-reclaimed-articles`);
    }
}

export default new StatisticsService();