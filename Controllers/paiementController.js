// controllers/paiementController.js
const Paiement = require('../models/Paiement');

exports.creerPaiement = async (req, res) => {
  try {
    const nouveauPaiement = new Paiement(req.body);
    const paiementEnregistre = await nouveauPaiement.save();
    res.status(201).json(paiementEnregistre);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
};

exports.getPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find().populate('membre cotisation');
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};
