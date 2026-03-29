// models/Membre.js
const mongoose = require('mongoose');

const membreSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  dateInscription: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    enum: ['actif', 'inactif'],
    default: 'actif'
  }
});

module.exports = mongoose.model('Membre', membreSchema);
