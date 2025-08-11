<template>
    <body>
      <section class="container">
        <div class="register-container">
          <!-- Cercle supérieur gauche -->
          <div class="circle circle-one"></div>
          
          <!-- Conteneur du formulaire -->
          <div class="form-container">
            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
            <h1 class="opacity">REGISTRE</h1>
            <form @submit.prevent="registerUser">
              <input v-model="firstname" type="text" placeholder="Prénom" required />
              <input v-model="lastname" type="text" placeholder="Nom" required />
              <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
              <input v-model="email" type="email" placeholder="Email" required />
              <input v-model="password" type="password" placeholder="Mot de passe" required />
              <button type="submit" class="opacity">S'INSCRIRE</button>
            </form>
            <div class="register-forget opacity">
            <a href="/login">Déjà inscrit ? Se connecter</a>
          </div>
          </div>
          
          <!-- Cercle inférieur droit -->
          <div class="circle circle-two"></div>
        </div>
      </section>
    </body>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService';
  
  export default {
    name: 'RegisterUser',
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
      };
    },
    methods: {
      async registerUser() {
        const user = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          username: this.username,
          password: this.password,
        };
        try {
          const response = await AuthService.register(user);
          console.log('User registered:', response.data);
          this.$router.push({ name: 'Login' });
        } catch (error) {
          console.error('Registration failed:', error.response.data);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  :root {
    --background: #1a1a2e;
    --color: #ffffff;
    --primary-color: #0f3460;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .register-container {
    position: relative;
    width: 22.2rem;
  }
  
  .form-container {
    border: 1px solid hsla(0, 0%, 65%, 0.158);
    box-shadow: 0 0 36px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(20px);
    z-index: 99;
    padding: 2rem;
  }
  
  .register-container form input {
    display: block;
    padding: 14.5px;
    width: 100%;
    margin: 1.5rem 0;
    color: var(--color);
    outline: none;
    background-color: #9191911f;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    letter-spacing: 0.8px;
    font-size: 15px;
    backdrop-filter: blur(15px);
  }
  
  .register-container form input:focus {
    box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.2);
    animation: wobble 0.3s ease-in;
  }
  
  .register-container form button {
    background-color: var(--primary-color);
    color: var(--color);
    display: block;
    padding: 13px;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    letter-spacing: 1.5px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: all 0.1s ease-in-out;
    border: none;
  }
  
  .register-container form button:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }
  
  .circle {
    width: 8rem;
    height: 8rem;
    background: rgb(107, 107, 239);
    border-radius: 50%;
    position: absolute;
  }
  
  .circle-one {
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate(-45%, -45%);
  }
  
  .circle-two {
    bottom: 0;
    right: 0;
    z-index: -1;
    transform: translate(45%, 45%);
  }
  
  .illustration {
    position: absolute;
    top: -14%;
    right: -2px;
    width: 90%;
  }
  
  .opacity {
    opacity: 0.6;
  }
  
  @keyframes wobble {
    0% {
      transform: scale(1.025);
    }
    25% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  