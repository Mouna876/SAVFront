<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Tableau de bord des statistiques</h1>

    <div class="stats-container">
      <!-- Affichage des statistiques sous forme de texte -->
      <div class="stat-box">
        <h3>Total Réclamations</h3>
        <p class="stat-value">{{ totalReclamations }}</p>
      </div>

      <div class="stat-box" v-if="customerSatisfactionRate !== null">
        <h3>Taux de Satisfaction Client</h3>
        <p class="stat-value">{{ customerSatisfactionRate }} %</p>
      </div>

      <div class="stat-box" v-if="totalFacturesHorsGarantie !== null">
        <h3>Factures Hors Garantie</h3>
        <p class="stat-value">{{ totalFacturesHorsGarantie }} €</p>
      </div>
    </div>

    <!-- Section Graphique des Réclamations par statut -->
    <div class="charts-container" v-if="reclamationPercentageByStatus">
      <h3>Réclamations par Statut</h3>
      <br>
      <div class="chart-list">
        <PieChart :data="reclamationPercentageData" />
      </div>
    </div>

    <!-- Section Articles les plus réclamés -->
    <div class="list-container" v-if="mostReclaimedArticles.length > 0">
      <h3>Liste des Réclamations</h3>
      <br>
      <div class="reclamation-cards">
        <div v-for="(article, index) in mostReclaimedArticles" :key="index" class="reclamation-card">
          <h4>{{ article }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Pie } from 'vue-chartjs';
import { Pie as PieChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import StatisticsService from "@/services/StatisticsService";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "DashboardAdmin",
  components: {
    PieChart,
  },
  data() {
    return {
      totalReclamations: '',
      customerSatisfactionRate: null,
      totalFacturesHorsGarantie: null,
      reclamationPercentageByStatus: null,
      mostReclaimedArticles: [],
    };
  },
  created() {
    this.fetchStatistics();
  },
  methods: {
    async fetchStatistics() {
      try {
        const reclamationsResponse = await StatisticsService.getTotalReclamations();
        this.totalReclamations = reclamationsResponse.data.totalReclamations; // Extraire la valeur

        const satisfactionResponse = await StatisticsService.getCustomerSatisfactionRate();
        this.customerSatisfactionRate = satisfactionResponse.data.satisfactionRate; // Extraire la valeur

        const facturesResponse = await StatisticsService.getTotalFacturesHorsGarantie();
        this.totalFacturesHorsGarantie = facturesResponse.data.totalFacturesHorsGarantie; // Extraire la valeur

        const statusResponse = await StatisticsService.getReclamationPercentageByStatus();
        this.reclamationPercentageByStatus = statusResponse.data;

        const articlesResponse = await StatisticsService.getMostReclaimedArticles();
        this.mostReclaimedArticles = articlesResponse.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    },
  },
  computed: {
    // Préparation des données pour le graphique circulaire
    reclamationPercentageData() {
      if (this.reclamationPercentageByStatus) {
        const labels = Object.keys(this.reclamationPercentageByStatus);
        const data = Object.values(this.reclamationPercentageByStatus);
        return {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'],
              hoverOffset: 4,
            },
          ],
        };
      }
      return {};
    },
  },
};
</script>
<style scoped>
  /* Global container styling */
  .dashboard {
    padding: 20px;
    background-color: white;
  }

  /* Dashboard title styling */
  .dashboard-title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }

  /* Stats container for the cards */
  .stats-container {
    margin-top: 90px;
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    justify-content: space-between;
  }

  .stat-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 30%;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid black;
  }

  .stat-box:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  .stat-box h3 {
    color: #4e5b6e;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1ea809;
  }

  /* Chart container */
  .charts-container {
    margin-top: 40px;
  }

  .charts-container h3 {
    font-size: 1.4rem;
  }

  .chart-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  /* List container for most reclaimed articles */
  .list-container {
    margin-top: 40px;
  }

  .list-container h3 {
    font-size: 1.3rem;
  }

  /* Style for the reclamation cards */
  .reclamation-cards {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  .reclamation-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 50%; /* To have two items per row */
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid #ddd;
  }

  .reclamation-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    background-color: #f9f9f9;
  }

  .reclamation-card h4 {
    font-size: 1.2rem;
    color: #333;
  }
  :deep(.chart-list){
    display: block;
    box-sizing: border-box;
    margin-left: 42%;
  }
</style>

  