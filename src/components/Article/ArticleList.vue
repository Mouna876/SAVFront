<template>
  <div class="article-list">
    <h1 class="title">Liste des Articles</h1>
    <div class="action-bar">
      <button class="btn-primary" @click="goToCreateArticle"><i class="fas fa-plus-circle"></i> Ajouter un Article</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Sous Garantie</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.nom }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.prix }}</td>
          <td>{{ article.sousGarantie ? 'Oui' : 'Non' }}</td>
          <td>
            <button @click="goToEditArticle(article.id)" class="action-button">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button @click="deleteArticle(article.id)" class="action-button-delete">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService';

export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await ArticleService.getArticles();
        this.articles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    },
    goToCreateArticle() {
      this.$router.push({ name: 'CreateArticle' });
    },
    goToEditArticle(articleId) {
      this.$router.push({ name: 'EditArticle', params: { id: articleId } });
    },
    async deleteArticle(articleId) {
      try {
        // Afficher une alerte de confirmation
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?');
        if (!confirmed) {
          return; // Arrêter la méthode si l'utilisateur annule
        }

        // Supprimer l'article
        await ArticleService.deleteArticle(articleId);

        // Rafraîchir la liste des articles
        this.fetchArticles();
        alert('Article supprimé avec succès.');
      } catch (error) {
        console.error("Erreur lors de la suppression de l'article:", error);
        alert('Une erreur est survenue lors de la suppression.');
      }
    },
  },
};
</script>

<style scoped>
/* Général */

div {
  font-family: 'Poppins', sans-serif;
  color: #2C3E50; /* Texte général dans une teinte sobre */
  padding: 20px;
  background-color: #F9B9B7; /* Rose pâle pour l'arrière-plan */
}

/* Titre principal */
h1 {
  color: #61A0AF; /* Bleu pastel pour le titre */
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1.5px;
  background: black; 
  -webkit-background-clip: text;
  color: transparent;
}

/* Boutons principaux (Ajouter, Modifier, Supprimer) */
button {
  background-color: #1ea809; /* Rose vif pour les boutons */
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
  box-shadow: 0 6px 12px rgba(245, 212, 145, 0.3); /* Ombre plus marquée */
}

button:active {
  transform: translateY(0); /* Remise en position normale lors du clic */
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
  background-color: #FFFFFF; /* Fond blanc pour la table */
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid #BDC3C7; /* Gris clair pour les séparations */
}

th {
  background-color: #FFFFFF; /* Bleu pastel pour l'en-tête */
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
.action-button-delete{
  background-color:#fb0000; /* Rose vif au survol */
}
.action-button{
  background-color: #e3c204e2;
}

td button:hover {
  transform: scale(1.1); /* Zoom au survol */
  border: 1px solid white;
}


tr:nth-child(even) {
  background-color: #F9B9B7; /* Rose pâle pour les lignes paires */
}

tr:nth-child(odd) {
  background-color: #FFFFFF; /* Fond blanc pour les lignes impaires */
}

/* Sections/Notifications */
div {
  background-color: WHITE; /* Jaune doux pour des notifications subtiles */
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

div:hover {
  transform: translateY(-2px); /* Légère animation au survol des sections */
}

/* Appels à l'action secondaires */
.secondary-button {
  background-color: #F9B9B7; /* Rose pâle pour des actions secondaires */
  color: #61A0AF; /* Bleu pastel pour le texte */
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: #F06C9B; /* Rose vif pour un effet dynamique au survol */
  transform: translateY(-2px); /* Effet de survol */
}
</style>
