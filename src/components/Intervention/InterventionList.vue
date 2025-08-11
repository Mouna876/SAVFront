<template>
  <div class="intervention-list">
    <h1 class="title">Liste des Interventions</h1>
    <div class="action-bar">
      <button class="btn-primary" @click="goToCreateIntervention">
        <i class="fas fa-plus-circle"></i> Ajouter une Intervention
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Sous Garantie</th>
          <th>Montant Facture</th>
          <th>Réclamation</th>
          <th>Technicien</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="intervention in interventions" :key="intervention.id">
          <td>{{ intervention.id }}</td>
          <td>{{ new Date(intervention.dateIntervention).toLocaleDateString() }}</td>
          <td>{{ intervention.sousGarantie ? 'Oui' : 'Non' }}</td>
          <td>{{ intervention.montantFacture ? intervention.montantFacture + ' €' : intervention.montantFacture }}</td>
          <td>
            <span v-if="intervention.reclamation">
              {{ intervention.reclamation.description }}
            </span>
            <span v-else>Non assignée</span>
          </td>
          <td>{{ getTechnicianName(intervention.technicienId) || 'Non assigné' }}</td>
          <td>
            <button @click="goToEditIntervention(intervention.id)" class="action-button">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button @click="deleteIntervention(intervention.id)" class="action-button-delete">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
            <button @click="calculateInvoice(intervention.id)" class="action-button-calculate">
              <i class="fas fa-calculator"></i> Facture Réglée
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import InterventionService from '@/services/InterventionService';
import ReclamationService from '@/services/ReclamationService';
import TechnicienService from '@/services/TechnicienService';  

export default {
  name: 'InterventionList',
  data() {
    return {
      interventions: [],
      techniciens: [], 
    };
  },
  created() {
    this.fetchInterventions();
    this.fetchTechnicians();  
  },
  methods: {
    async fetchInterventions() {
      try {
        const response = await InterventionService.getInterventions();
        const interventions = response.data;

        const reclamationIds = [...new Set(interventions.map(i => i.reclamationId))].filter(Boolean);
        const reclamationResponses = await Promise.all(
          reclamationIds.map(id => ReclamationService.getReclamationById(id))
        );

        const reclamationsMap = reclamationResponses.reduce((map, res) => {
          map[res.data.id] = res.data;
          return map;
        }, {});

        this.interventions = interventions.map(intervention => ({
          ...intervention,
          reclamation: reclamationsMap[intervention.reclamationId] || null,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des interventions:', error);
      }
    },

    async fetchTechnicians() {
      try {
        const response = await TechnicienService.getTechniciens();
        this.techniciens = response.data; 
      } catch (error) {
        console.error('Erreur lors de la récupération des techniciens:', error);
      }
    },

    getTechnicianName(technicienId) {
      const technicien = this.techniciens.find(t => t.id === technicienId);
      return technicien ? `${technicien.nom}` : null; 
    },

    goToCreateIntervention() {
      this.$router.push({ name: 'CreateIntervention' });
    },

    goToEditIntervention(id) {
      this.$router.push({ name: 'EditIntervention', params: { id } });
    },

    async deleteIntervention(id) {
      try {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?');
        if (!confirmed) return;

        await InterventionService.deleteIntervention(id);
        this.fetchInterventions();
        alert('Intervention supprimée avec succès.');
      } catch (error) {
        console.error("Erreur lors de la suppression de l'intervention:", error);
        alert('Une erreur est survenue lors de la suppression.');
      }
    },

    async calculateInvoice(id) {
      try {
        const response = await InterventionService.calculateInvoice(id);
        alert(`Montant de la facture : ${response.data} €`);
        this.fetchInterventions();
      } catch (error) {
        console.error('Erreur lors du calcul de la facture:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Général */
.intervention-list {
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

.action-button-calculate {
  background-color: #00A9A9;
}

td button:hover {
  transform: scale(1.1);
  border: 1px solid white;
}

tr:nth-child(odd) {
  background-color: #FFFFFF;
}
</style>
