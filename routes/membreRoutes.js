// routes/membreRoutes.js
const express = require('express');
const router = express.Router();
const Membre = require('../models/membre');

// ➕ Ajouter un membre
router.post('/', async (req, res) => {
  try {
    const membre = new Membre(req.body);
    await membre.save();
    res.status(201).json(membre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Lister tous les membres
router.get('/', async (req, res) => {
  try {
    const membres = await Membre.find();
    res.status(200).json(membres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔄 Modifier un membre
router.put('/:id', async (req, res) => {
  try {
    const updated = await Membre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un membre
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Membre.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
