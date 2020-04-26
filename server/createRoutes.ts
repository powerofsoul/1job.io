const glob = require('glob');
import { Router } from "express";
const router = Router();

 glob.sync(__dirname + '/api/**/*.ts')
        .map(filename => {
            const arr = filename.split('/')
            let name = arr.pop();
            name = name.replace('.ts', '')
            return {
                path: `/${name.toLowerCase()}`,
                router: require(`${filename.replace('.ts', '')}`)
            }
        })
        .forEach(r => {
            router.use(r.path, r.router.default)
        });

export default router;