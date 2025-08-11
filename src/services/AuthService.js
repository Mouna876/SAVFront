import axios from 'axios';

const AUTH_API_BASE_URL = 'https://localhost:7233/api/Auth';

class AuthService {
  /**
   * Enregistrer un utilisateur
   * @param {Object} user - L'objet utilisateur contenant email, username, password, etc.
   * @returns {Promise} - La réponse de l'API
   */
  register(user) {
    return axios.post(`${AUTH_API_BASE_URL}/register`, user);
  }

  /**
   * Obtenir un token JWT
   * @param {Object} credentials - Les identifiants utilisateur { email, password }
   * @returns {Promise} - La réponse de l'API avec le token
   */
  getToken(credentials) {
    return axios.post(`${AUTH_API_BASE_URL}/token`, credentials);
  }

  /**
   * Ajouter un rôle à un utilisateur
   * @param {Object} roleData - Les données du rôle { userId, role }
   * @returns {Promise} - La réponse de l'API
   */
  addRole(roleData) {
    return axios.post(`${AUTH_API_BASE_URL}/addrole`, roleData);
  }
    /**
   * Récupérer la liste des utilisateurs
   * @returns {Promise} - La réponse de l'API contenant la liste des utilisateurs
   */
    getUsers() {
      return axios.get(`${AUTH_API_BASE_URL}/getusers`);
    }
}

export default new AuthService();