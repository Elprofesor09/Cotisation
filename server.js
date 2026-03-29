// Chargement des variables d'environnement
require('dotenv').config();

// Importation des modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());

// Importation des routes
const membreRoutes = require('./routes/membreRoutes');
app.use('/api/membres', membreRoutes); // <-- branchée AVANT listen()

const cotisationMensuelleRoutes = require('./routes/cotisationMensuelleRoutes');
app.use('/api/cotisations', cotisationMensuelleRoutes);

const cotisationExceptionnelleRoutes = require('./routes/cotisationExceptionnelleRoutes');
app.use('/api/cotisations-exceptionnelles', cotisationExceptionnelleRoutes);



// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion à MongoDB réussie'))
.catch(err => console.error('❌ Erreur de connexion à MongoDB :', err));

app.use(express.static('public'));



// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
