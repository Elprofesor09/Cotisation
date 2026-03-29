const mongoose = require('mongoose');

const cotisationExceptionnelleSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  membresInclus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membre',
  }]
});

module.exports = mongoose.model('CotisationExceptionnelle', cotisationExceptionnelleSchema);
