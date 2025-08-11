import axios from 'axios';

const ARTICLE_API_BASE_URL = 'https://localhost:7233/api/articles';

class ArticleService {
  getArticles() {
    return axios.get(ARTICLE_API_BASE_URL);
  }

  getArticleById(id) {
    return axios.get(`${ARTICLE_API_BASE_URL}/${id}`);
  }

  createArticle(article) {
    return axios.post(ARTICLE_API_BASE_URL, article);
  }

  updateArticle(id, article) {
    return axios.put(`${ARTICLE_API_BASE_URL}/${id}`, article);
  }

  deleteArticle(id) {
    return axios.delete(`${ARTICLE_API_BASE_URL}/${id}`);
  }
}

export default new ArticleService();