<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Modifier' : 'Ajouter' }} une Intervention</h1>
    <form @submit.prevent="saveIntervention">
      <div class="form-group">
        <label for="date">Date de l'intervention :</label>
        <input
          type="date"
          id="date"
          v-model="intervention.dateIntervention"
          required
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="sousGarantie">Sous Garantie :</label>
        <input
          type="checkbox"
          id="sousGarantie"
          v-model="intervention.sousGarantie"
          class="checkbox"
        />
      </div>

      <div class="form-group">
        <label for="montantFacture">Montant Facture (€) :</label>
        <input
          type="number"
          id="montantFacture"
          v-model="intervention.montantFacture"
          placeholder="Ex : 150.00"
          step="0.01"
          min="0"
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="reclamationId">Réclamation associée :</label>
        <select
          id="reclamationId"
          v-model="intervention.reclamationId"
          required
          class="input-field"
        >
          <option
            v-for="reclamation in reclamations"
            :key="reclamation.id"
            :value="reclamation.id"
          >
            {{ reclamation.description }}
          </option>
        </select>
      </div>

      <!-- Mise à jour du champ pour choisir le technicien -->
      <div class="form-group">
        <label for="technicienId">Technicien affecté :</label>
        <select
          id="technicienId"
          v-model="intervention.technicienId"
          required
          class="input-field"
        >
          <option
            v-for="technicien in techniciens"
            :key="technicien.id"
            :value="technicien.id"
          >
            {{ technicien.nom }} <!-- Affiche le nom du technicien -->
          </option>
        </select>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">{{ isEditMode ? 'Modifier' : 'Ajouter' }}</button>
        &nbsp; &nbsp;
        <button type="button" @click="cancel" class="cancel-button">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
import InterventionService from '@/services/InterventionService';
import ReclamationService from '@/services/ReclamationService';
import TechnicienService from '@/services/TechnicienService'; // Ajouter le service pour les techniciens

export default {
  name: 'CreateIntervention',
  data() {
    return {
      intervention: {
        dateIntervention: '',
        sousGarantie: false,
        montantFacture: 0.0,
        reclamationId: null,
        technicienId: null,
      },
      reclamations: [], // Liste des réclamations
      techniciens: [], // Liste des techniciens
      isEditMode: false,
    };
  },
  async created() {
    // Charger les réclamations et les techniciens
    await this.fetchReclamations();
    await this.fetchTechniciens();

    // Charger les données si mode édition
    const interventionId = this.$route.params.id;
    if (interventionId) {
      this.isEditMode = true;
      const response = await InterventionService.getInterventionById(interventionId);
      this.intervention = response.data;
    }
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
    async fetchTechniciens() {
      try {
        const response = await TechnicienService.getTechniciens(); // Assurez-vous que ce service récupère la liste des techniciens
        this.techniciens = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des techniciens:', error);
      }
    },
    async saveIntervention() {
      try {
        if (this.isEditMode) {
          await InterventionService.updateIntervention(this.intervention.id, this.intervention);
        } else {
          await InterventionService.createIntervention(this.intervention);
        }
        this.$router.push({ name: 'InterventionList' });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'intervention:', error);
      }
    },
    cancel() {
      this.$router.push({ name: 'InterventionList' });
    },
  },
};
</script>

<style scoped>
/* Global form styling */
.form-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

h1 {
  text-align: center;
  color: #4f6d7a;
  font-size: 2.4rem;
  margin-bottom: 30px;
}

/* Input fields */
.input-field {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #61a0af;
  outline: none;
  box-shadow: 0 0 5px rgba(97, 160, 175, 0.5);
}

/* Checkbox styling */
.checkbox {
  transform: scale(1.2);
  width: 100px;
  height: 15px;
}

/* Form group for aligning elements */
.form-group {
  margin-bottom: 20px;
}

/* Submit Button */
.submit-button {
  padding: 12px 24px;
  background-color: #1ea809;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #17a512;
  transform: translateY(-3px);
}

.submit-button:active {
  transform: translateY(0);
}

/* Cancel Button */
.cancel-button {
  padding: 12px 24px;
  background-color: #e0e0e0;
  color: #333;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cancel-button:hover {
  background-color: #ccc;
  transform: translateY(-3px);
}

.cancel-button:active {
  transform: translateY(0);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }
}
</style>
