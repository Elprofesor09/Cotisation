const express = require('express');
const router = express.Router();
const CotisationExceptionnelle = require('../models/CotisationExceptionnelle');

// POST - Ajouter une nouvelle cotisation spéciale
router.post('/', async (req, res) => {
  try {
    const { theme, montant, date, membresInclus } = req.body;
    const cotisation = new CotisationExceptionnelle({
      theme,
      montant,
      date,
      membresInclus
    });
    const saved = await cotisation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Liste de toutes les cotisations spéciales
router.get('/', async (req, res) => {
  try {
    const cotisations = await CotisationExceptionnelle.find()
      .populate('membresInclus');
    res.json(cotisations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 PUT - Modifier une cotisation exceptionnelle
router.put('/:id', async (req, res) => {
    try {
      const updated = await CotisationExceptionnelle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// GET - Détail d’une cotisation spéciale par ID
router.get('/:id', async (req, res) => {
  try {
    const cotisation = await CotisationExceptionnelle.findById(req.params.id)
      .populate('membresInclus');
    if (!cotisation) {
      return res.status(404).json({ message: "Cotisation non trouvée" });
    }
    res.json(cotisation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Ajouter un membre
router.put('/:id/ajouter-membre', async (req, res) => {
  try {
    const { membreId } = req.body;
    const cotisation = await CotisationExceptionnelle.findById(req.params.id);
    if (!cotisation) return res.status(404).json({ message: "Cotisation non trouvée" });

    if (!cotisation.membresInclus.includes(membreId)) {
      cotisation.membresInclus.push(membreId);
      await cotisation.save();
    }

    res.json(cotisation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Supprimer un membre
router.put('/:id/supprimer-membre', async (req, res) => {
  try {
    const { membreId } = req.body;
    const cotisation = await CotisationExceptionnelle.findById(req.params.id);
    if (!cotisation) return res.status(404).json({ message: "Cotisation non trouvée" });

    cotisation.membresInclus = cotisation.membresInclus.filter(
      id => id.toString() !== membreId
    );

    await cotisation.save();
    res.json(cotisation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Supprimer une cotisation
router.delete('/:id', async (req, res) => {
  try {
    await CotisationExceptionnelle.findByIdAndDelete(req.params.id);
    res.json({ message: "Cotisation supprimée avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
