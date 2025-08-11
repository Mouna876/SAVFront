<template>
    <div class="create-technicien">
      <h1 class="title">Ajouter un Technicien</h1>
      <form @submit.prevent="createTechnicien">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input v-model="technicien.nom" type="text" id="nom" required />
        </div>
        <div class="form-group">
          <label for="specialisation">Spécialisation</label>
          <input v-model="technicien.specialisation" type="text" id="specialisation" required />
        </div>
        <button type="submit" class="btn-primary">Créer Technicien</button>
      </form>
    </div>
  </template>
  
  <script>
  import TechnicienService from '@/services/TechnicienService';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'CreateTechnicien',
    data() {
      return {
        technicien: {
          nom: '',
          specialisation: ''
        }
      };
    },
    methods: {
      async createTechnicien() {
        try {
          await TechnicienService.createTechnicien(this.technicien);
          this.$router.push({ name: 'TechnicienList' }); // Rediriger vers la liste des techniciens
        } catch (error) {
          console.error('Erreur lors de la création du technicien:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-technicien {
    font-family: 'Poppins', sans-serif;
    color: #2C3E50;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
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
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #BDC3C7;
    border-radius: 5px;
    margin-top: 5px;
  }
  
  button {
    background-color: #1ea809;
    color: white;
    border: none;
    border-radius: 30px;
    padding: 12px 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }
  
  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(245, 212, 145, 0.3);
  }
  </style>
  