<template>
  <div class="form-container">
    <h1>Ajouter une Pièce</h1>
    <form @submit.prevent="createPiece">
      <div class="form-group">
        <label for="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          v-model="piece.nom"
          required
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="prix">Prix :</label>
        <input
          type="number"
          id="prix"
          v-model="piece.prix"
          required
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label for="article">Article :</label>
        <select v-model="piece.articleId" required class="input-field">
          <option v-for="article in articles" :key="article.id" :value="article.id">
            {{ article.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
import PieceService from '@/services/PieceService';
import ArticleService from '@/services/ArticleService';

export default {
  name: 'CreatePiece',
  data() {
    return {
      piece: {
        nom: '',
        prix: 0,
        articleId: null,
      },
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
    async createPiece() {
      try {
        await PieceService.createPiece(this.piece);
        this.$router.push({ name: 'Piece' }); // Retourner à la liste des pièces après la création
      } catch (error) {
        console.error('Erreur lors de la création de la pièce:', error);
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
