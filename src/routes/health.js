const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    status: 'OK',
    timestamp: Date.now(),
    memoryUsage: process.memoryUsage(),
  };

  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.status = 'ERROR';
    res.status(503).json(healthCheck);
  }
});

module.exports = router;
