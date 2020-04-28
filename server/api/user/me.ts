import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/',
  passport.authorize('local'),
  (req, res) => {
      res.json({ id: req.user.id, username: req.user.email });
  });

export default router;