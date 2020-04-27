import {Router} from "express";
import { authenticate } from "passport";

const router = Router();

router.get('/', function (req, res){
    req.logOut();
    res.redirect('/');
});

export default router;