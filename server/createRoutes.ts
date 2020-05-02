import { Router } from "express";
const router = Router();
import health from "./api/health";
import job from "./api/job";
import user from "./api/user";

const routes = [
    { path: "/health", module: health },
    { path: "/job", module: job },
    { path: "/user", module: user }
]

routes.forEach(r=> router.use(r.path, r.module));

export default router;