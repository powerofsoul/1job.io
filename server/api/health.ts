const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send("Alive"));
router.post('/', (req, res) => res.send('Alive'));

export default router;