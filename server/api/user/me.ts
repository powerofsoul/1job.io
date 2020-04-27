import { Router } from "express";
const router = Router();

router.get('/',
  function (req, res) {
    res.json({ id: req.user.id, username: req.user.email });
  });

export default router;