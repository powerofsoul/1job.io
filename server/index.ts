
import express, { Request, Response } from "express";
import next from "next";
import router from "./createRoutes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
import { connect } from "mongoose";

const mongoConnectionUrl = process.env.MONGO_URL || "mongodb://localhost:27017/jobsremotely";

(async () => {
    try {
        await app.prepare();
        connect(
            mongoConnectionUrl,
            { useNewUrlParser: true }
        );

        const server = express();

        server.use('/api', router);
        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();