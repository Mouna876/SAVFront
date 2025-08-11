<template>
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item" v-for="parent in navbarStructure" :key="parent.name">
          <router-link
            v-if="parent.path"
            class="navbar-link"
            :class="{'dashboard-link': parent.label === 'Tableau de bord' }"
            :to="parent.path"
          >{{ parent.label }}</router-link>

          <ul v-if="parent.children && parent.children.length" class="dropdown">
            <li class="dropdown-item" v-for="child in parent.children" :key="child.name">
              <router-link
                v-if="child.path"
                class="dropdown-link"
                :to="child.path"
              >{{ child.label }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        navbarStructure: [
        {
            label: "Tableau de bord",
            path: "/dashboard",
            name: "Dashboard",
            children: [],
          },
          {
            label: "Clients",
            path: "/clients",
            name: "Client",
            children: [
            { label: "Liste des clients", path: "/clients", name: "Client" },
              { label: "Créer un client", path: "/create-client", name: "CreateClient" },
            ],
          },
          {
          label: "Techniciens", 
          path: "/techniciens", 
          name: "Technicien",
          children: [
            { label: "Liste des techniciens", path: "/techniciens", name: "TechnicienList" },
            { label: "Créer un technicien", path: "/technicien/create", name: "CreateTechnicien" },
          ],
        },

          {
            label: "Articles",
            path: "/articles",
            name: "ArticleList" ,
            children: [
            { label: "Lists des articles", path: "/articles", name: "ArticleList" },
              { label: "Créer un article", path: "/create-article", name: "CreateArticle" },
            ],
          },
          {
            label: "Interventions",
            path: "/interventions",
            name: "InterventionList",
            children: [
            { label: "Liste des interventions", path: "/interventions", name: "InterventionList" },
              { label: "Créer une intervention", path: "/create-intervention", name: "CreateIntervention" },
            ],
          },
          {
            label: "Réclamations",
            path: "/reclamations",
            name: "ReclamationList",
            children: [
            { label: "Liste des réclamations", path: "/reclamations", name: "ReclamationList" },
              { label: "Créer une réclamation", path: "/create-reclamation", name: "CreateReclamation" },
            ],
          },
          {
            label: "Pièces",
            path: "/pieces",
            name: "Piece",
            children: [
            { label: "Liste des pièces", path: "/pieces", name: "Piece" },
              { label: "Créer une pièce", path: "/create-piece", name: "CreatePiece" },
            ],
          },
          {
            label: "Authentification",
            path: "/login", 
            name: "Login",
            children: [
            { label: "Ajouter un rôle", path: "/add-role", name: "Role" },
            { label: "Se déconnecter", path: "/login", name: "Login" },
            ],
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
/* Navbar Container */
.navbar {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Navbar List */
.navbar-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-around;
  align-items: center;
}

/* Navbar Item */
.navbar-item {
  position: relative;
  display: inline-block;
  padding: 8px 12px; /* Ajouter un peu de marge interne */
  transition: transform 0.3s ease;
}

/* Ajout d'un effet au survol */
.navbar-item:hover {
  transform: scale(1.05); /* Agrandir légèrement l'élément au survol */
}

/* Navbar Link */
.navbar-link {
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 8px 12px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-link:hover,
.navbar-link:focus {
  color: #1abc9c;
  transform: translateY(-2px); /* Légère élévation au survol */
}

/* Dropdown Menu */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #34495e;
  list-style: none;
  margin: 0;
  padding: 0;
  display: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  min-width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s ease, visibility 0s 0.3s, transform 0.3s ease;
}

/* Afficher le dropdown au survol du parent */
.navbar-item:hover .dropdown {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 0.3s ease, visibility 0s, transform 0.3s ease;
}

/* Dropdown Item */
.dropdown-item {
  margin: 0;
}

/* Dropdown Link */
.dropdown-link {
  text-decoration: none;
  color: white;
  font-size: 0.9rem;
  padding: 8px 16px;
  display: block;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
}

.dropdown-link:hover,
.dropdown-link:focus {
  background-color: #1abc9c;
  padding-left: 20px; /* Ajout d'une indentation pour plus de profondeur */
}
/* Spécifique à Dashboard */
.dashboard-link {
  color: #3498db; /* Couleur bleu par exemple, vous pouvez personnaliser */
}

.dashboard-link:hover,
.dashboard-link:focus {
  color: #1abc9c; /* Couleur au survol */
}


  </style>
  