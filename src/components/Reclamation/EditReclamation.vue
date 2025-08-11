<template>
  <div class="form-container">
    <h1>Modifier une Réclamation</h1>
    <form @submit.prevent="updateReclamation">
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea
          id="description"
          v-model="reclamation.description"
          required
          class="input-field"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="date">Date :</label>
        <input
          type="date"
          id="date"
          v-model="reclamation.dateReclamation"
          required
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="statut">Statut :</label>
        <select
          id="statut"
          v-model="reclamation.statut"
          required
          class="input-field"
        >
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </div>

      <div class="form-group">
        <label for="clientId">Client :</label>
        <select
          id="clientId"
          v-model="reclamation.clientId"
          required
          class="input-field"
        >
          <option
            v-for="client in clients"
            :key="client.id"
            :value="client.id"
          >
            {{ client.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">Modifier</button>
      </div>
    </form>
  </div>
</template>

<script>
import ReclamationService from "@/services/ReclamationService";
import ClientService from "@/services/ClientService";

export default {
  name: "EditReclamation",
  data() {
    return {
      reclamation: {
        id: null,
        description: "",
        dateReclamation: "",
        statut: "En cours",
        clientId: null,
      },
      clients: [], // Liste des clients
    };
  },
  async created() {
    try {
      // Charger la liste des clients
      await this.fetchClients();

      // Récupérer la réclamation par ID depuis les paramètres de route
      const { id } = this.$route.params;
      const response = await ReclamationService.getReclamationById(id);
      this.reclamation = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  },
  methods: {
    async fetchClients() {
      try {
        const response = await ClientService.getClients();
        this.clients = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    },
    async updateReclamation() {
      try {
        await ReclamationService.updateReclamation(
          this.reclamation.id,
          this.reclamation
        );
        this.$router.push({ name: "ReclamationList" });
      } catch (error) {
        console.error("Erreur lors de la modification :", error);
      }
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

/* Input fields and select dropdown */
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }
}
</style>
