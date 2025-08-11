<template>
  <div class="reclamation-list">
    <h1 class="title">Liste des Réclamations</h1>
    <div class="action-bar">
      <button class="btn-primary" @click="goToCreateReclamation">Ajouter une Réclamation</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Client</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reclamation in reclamations" :key="reclamation.id">
          <td>{{ reclamation.id }}</td>
          <td>{{ reclamation.description }}</td>
          <td>{{ reclamation.dateReclamation }}</td>
          <td>{{ reclamation.statut }}</td>
          <td>{{ getClientName(reclamation.clientId) || 'N/A' }}</td>
          <td>
            <button @click="goToEditReclamation(reclamation.id)" class="action-button">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button @click="deleteReclamation(reclamation.id)" class="action-button-delete">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReclamationService from '@/services/ReclamationService';
import ClientService from '@/services/ClientService';

export default {
  name: 'ReclamationList',
  data() {
    return {
      reclamations: [],
      clients: [], // Liste des clients
    };
  },
  async created() {
    await this.fetchClients(); // Charger les clients avant de charger les réclamations
    this.fetchReclamations();
  },
  methods: {
    async fetchReclamations() {
      try {
        const response = await ReclamationService.getReclamations();
        this.reclamations = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations:', error);
      }
    },
    async fetchClients() {
      try {
        const response = await ClientService.getClients();
        this.clients = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    },
    getClientName(clientId) {
      const client = this.clients.find((client) => client.id === clientId);
      return client ? client.nom : null;
    },
    goToCreateReclamation() {
      this.$router.push({ name: 'CreateReclamation' });
    },
    goToEditReclamation(id) {
      this.$router.push({ name: 'EditReclamation', params: { id } });
    },
    async deleteReclamation(id) {
  try {
    // Afficher une boîte de dialogue de confirmation
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?');
    if (!confirmed) {
      return; // Arrêter l'exécution si l'utilisateur annule
    }

    // Supprimer la réclamation
    await ReclamationService.deleteReclamation(id);

    // Rafraîchir la liste des réclamations
    this.fetchReclamations();

    // Afficher un message de succès
    alert('Réclamation supprimée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    alert('Une erreur est survenue lors de la suppression.');
  }
},

  },
};
</script>


<style scoped>
/* Général */
.reclamation-list {
  font-family: 'Poppins', sans-serif;
  color: #2C3E50;
  padding: 20px;
}

.title {
  color: #61A0AF;
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1.5px;
  background: black;
  -webkit-background-clip: text;
  color: transparent;
}

.action-bar {
  margin-bottom: 20px;
}

/* Boutons principaux */
button {
  background-color: #1ea809;
  color: #FFFFFF;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(240, 108, 155, 0.2);
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(245, 212, 145, 0.3);
}

button:active {
  transform: translateY(0);
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #BDC3C7;
}

th {
  background-color: #FFFFFF;
  color: black;
  font-weight: bold;
}

td {
  color: #2C3E50;
  font-size: 16px;
}

td button {
  margin-right: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  color: white;
}

.action-button-delete {
  background-color: #fb0000;
}

.action-button {
  background-color: #e3c204e2;
}

td button:hover {
  transform: scale(1.1);
  border: 1px solid white;
}

tr:nth-child(odd) {
  background-color: #FFFFFF;
}
</style>
