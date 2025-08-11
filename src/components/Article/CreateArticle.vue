<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Modifier' : 'Ajouter' }} un Article</h1>
    <form @submit.prevent="saveArticle">
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="article.nom" required class="input-field"/>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="article.description" required class="input-field"></textarea>
      </div>

      <div class="form-group flex-container">
        <div class="flex-item">
          <label for="prix">Prix:</label>
          <input type="number" id="prix" v-model="article.prix" required class="input-field"/>
        </div>
<br><br>
<br>

        <div class="flex-item" style="margin-top: 30px;">
          <label for="sousGarantie">Sous Garantie:</label> 
          <input type="checkbox" id="sousGarantie" v-model="article.sousGarantie" class="checkbox"/>
        </div>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">{{ isEditMode ? 'Modifier' : 'Ajouter' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService';

export default {
  name: 'CreateArticle',
  data() {
    return {
      article: {
        nom: '',
        description: '',
        prix: 0,
        sousGarantie: false,
      },
      isEditMode: false,
    };
  },
  async created() {
    const articleId = this.$route.params.id;
    if (articleId) {
      this.isEditMode = true;
      const response = await ArticleService.getArticleById(articleId);
      this.article = response.data;
    }
  },
  methods: {
    async saveArticle() {
      try {
        if (this.isEditMode) {
          await ArticleService.updateArticle(this.article.id, this.article);
        } else {
          await ArticleService.createArticle(this.article);
        }
        this.$router.push({ name: 'ArticleList' });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'article:', error);
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

/* Input fields and text areas */
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

textarea {
  min-height: 120px;
  resize: vertical;
}

/* Form group for aligning elements */
.form-group {
  margin-bottom: 20px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.flex-item {
  flex: 1;
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

/* Checkbox styling */
.checkbox {
  transform: scale(1.2);
  width: 100px;
  height: 15px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
  .flex-item {
    margin-bottom: 20px;
  }
}
</style>
