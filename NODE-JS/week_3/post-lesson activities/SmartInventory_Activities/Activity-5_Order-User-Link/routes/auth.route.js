const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/register', async (req, res) => {
  try {
    const out = await authService.register(req.body);
    res.status(201).json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await authService.login(req.body);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    res.json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
