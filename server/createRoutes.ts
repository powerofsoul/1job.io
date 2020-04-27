const glob = require('glob');
import { Router } from "express";
const router = Router();

glob.sync(__dirname + '/api/**/*.@(ts|js)')
    .map(filename => {
        const arr = filename.split('/').slice(filename.split('/').indexOf('api') + 1);
        let name = arr.join('/');
        name = name.replace('.ts', '').replace('.js', '')
        console.log(`/${name.toLowerCase()}`)
        return {
            path: `/${name.toLowerCase()}`,
            router: require(`${filename.replace('.ts', '')}`)
        }
    })
    .forEach(r => {
        router.use(r.path, r.router.default)
    });

export default router;