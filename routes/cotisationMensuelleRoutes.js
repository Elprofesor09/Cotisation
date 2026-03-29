// routes/cotisationMensuelleRoutes.js
const express = require('express');
const router = express.Router();
const CotisationMensuelle = require('../models/CotisationMensuelle');

// POST - Enregistrer une cotisation mensuelle
router.post('/', async (req, res) => {
  try {
    const cotisation = new CotisationMensuelle(req.body);
    const saved = await cotisation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Liste des cotisations mensuelles
router.get('/', async (req, res) => {
  try {
    const { mois, annee } = req.query;
    const filter = { type: 'mensuelle' };

    if (mois) filter.mois = parseInt(mois);
    if (annee) filter.annee = parseInt(annee);

    const cotisations = await CotisationMensuelle.find(filter).populate('membre');
    res.json(cotisations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Supprimer une cotisation mensuelle
router.delete('/:id', async (req, res) => {
    try {
      await CotisationMensuelle.findByIdAndDelete(req.params.id);
      res.json({ message: 'Cotisation supprimée avec succès.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // PUT - Modifier une cotisation mensuelle
router.put('/:id', async (req, res) => {
    try {
      const updated = await CotisationMensuelle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  

module.exports = router;
