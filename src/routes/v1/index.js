import express from 'express';
import clientsRoute from '../../apps/clients/clientRoutes.js';
import linksRoute from '../../apps/links/linkRoutes.js';
import reportsRoute from '../../apps/reports/routes.js';
import logger from '@libs/logger.js';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/clients',
        route: clientsRoute,
    },
    {
        path: '/links',
        route: linksRoute,
    },
    {
        path: '/reports',
        route: reportsRoute,
    },
];

// const devRoutes = [
//     {
//         path: '/docs',
//         route: docRoute,
//     }
// ];
try {
    for (const route of defaultRoutes) {
        router.use(route.path, route.route);
    }
} catch (error) {
    logger.error(error);
}

export default router;