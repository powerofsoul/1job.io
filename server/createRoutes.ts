import { Router } from "express";
const router = Router();
import health from "./api/health";
import job from "./api/job";
import user from "./api/user";
import payment from "./api/payment";
import admin from "./api/admin";

const routes = [
    { path: "/health", module: health },
    { path: "/payment/", module: payment },
    { path: "/job", module: job },
    { path: "/user", module: user },
    { path: "/admin", module: admin }
]

routes.forEach(r=> router.use(r.path, r.module));

export default router;