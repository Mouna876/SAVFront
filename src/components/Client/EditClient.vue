<template>
  <div class="form-container">
    <h1>Modifier un Client</h1>
    <form @submit.prevent="updateClient">
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="client.nom" required class="input-field"/>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="client.email" required class="input-field"/>
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone:</label>
        <input type="tel" id="telephone" v-model="client.telephone" required class="input-field"/>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">Modifier</button>
      </div>
    </form>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService';

export default {
  name: 'EditClient',
  data() {
    return {
      client: {
        id: null,
        nom: '',
        email: '',
        telephone: ''
      }
    };
  },
  created() {
    this.fetchClientData();
  },
  methods: {
    async fetchClientData() {
      const clientId = this.$route.params.id; // Récupérer l'id depuis les paramètres de la route
      try {
        const response = await ClientService.getClientById(clientId);
        this.client = response.data; // Remplir les champs avec les données du client
      } catch (error) {
        console.error('Erreur lors de la récupération du client:', error);
      }
    },
    async updateClient() {
      try {
        await ClientService.updateClient(this.client.id, this.client);
        this.$router.push({ name: 'Client' }); // Retourner à la liste des clients après modification
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
      }
    }
  }
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
