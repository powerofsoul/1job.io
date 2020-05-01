const glob = require('glob');
import { Router } from "express";
const router = Router();

glob.sync(__dirname + '/api/**/*.@(ts|js)')
    .map(filename => {
        const splittedFileName = filename.split('/');
        let name = splittedFileName.slice(splittedFileName.indexOf('api') + 1).join('/');
        name = name.replace('.ts', '').replace('.js', '')
        
        return {
            path: `/${name.toLowerCase()}`,
            router: require(`${filename.replace('.ts', '').replace('js', '')}`)
        }
    })
    .forEach(r => {
        router.use(r.path, r.router.default)
    });

export default router;