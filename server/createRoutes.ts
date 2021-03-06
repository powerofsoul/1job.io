import { Router } from "express";
const router = Router();
import health from "./api/health";
import job from "./api/job";
import user from "./api/user";
import payment from "./api/payment";
import admin from "./api/admin";
import blog from "./api/blog";
import newsletter from "./api/newsletter";

const routes = [
    { path: "/health", module: health },
    { path: "/payment/", module: payment },
    { path: "/job", module: job },
    { path: "/user", module: user },
    { path: "/admin", module: admin },
    { path: "/blog", module: blog },
    { path: "/newsletter", module: newsletter }
]

routes.forEach(r=> router.use(r.path, r.module));

export default router;