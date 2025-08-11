<template>
    <div class="technicien-list">
      <h1 class="title">Liste des Techniciens</h1>
      <div class="action-bar">
        <button class="btn-primary" @click="goToCreateTechnicien">Ajouter un Technicien</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Spécialisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="technicien in techniciens" :key="technicien.id">
            <td>{{ technicien.id }}</td>
            <td>{{ technicien.nom }}</td>
            <td>{{ technicien.specialisation }}</td>
            <td>
              <button @click="goToEditTechnicien(technicien.id)" class="action-button">
                <i class="fas fa-edit"></i> Modifier
              </button>
              <button @click="deleteTechnicien(technicien.id)" class="action-button-delete">
                <i class="fas fa-trash-alt"></i> Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import TechnicienService from '@/services/TechnicienService';
  
  export default {
    name: 'TechnicienList',
    data() {
      return {
        techniciens: [], // Liste des techniciens
      };
    },
    created() {
      this.fetchTechniciens();
    },
    methods: {
      async fetchTechniciens() {
        try {
          const response = await TechnicienService.getTechniciens();
          this.techniciens = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des techniciens:', error);
        }
      },
      goToCreateTechnicien() {
        this.$router.push({ name: 'CreateTechnicien' });
      },
      goToEditTechnicien(id) {
        this.$router.push({ name: 'EditTechnicien', params: { id } });
      },
      async deleteTechnicien(id) {
        try {
          await TechnicienService.deleteTechnicien(id);
          this.fetchTechniciens(); // Rafraîchir la liste après suppression
        } catch (error) {
          console.error('Erreur lors de la suppression du technicien:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Général */
  .technicien-list {
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
  