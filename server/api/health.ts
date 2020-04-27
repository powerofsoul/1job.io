import { Router } from "express";
const router = Router();

router.get('/', (req, res) => res.send("Alive"));
router.post('/', (req, res) => res.send('Alive'));

export default router;