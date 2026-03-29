// models/CotisationMensuelle.js
const mongoose = require('mongoose');

const cotisationMensuelleSchema = new mongoose.Schema({
  membre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membre',
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  mois: {
    type: Number, // 1 = Janvier, 12 = Décembre
    required: true
  },
  annee: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['mensuelle'],
    default: 'mensuelle'
  }
});

module.exports = mongoose.model('CotisationMensuelle', cotisationMensuelleSchema);
