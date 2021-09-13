const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'Simple Node Boilerplate',
    version: '1.0.0',
  });
});

module.exports = router;
