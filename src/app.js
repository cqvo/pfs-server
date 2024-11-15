import express from 'express';
import routes from './routes/v1/index.js';
import logger from '#libs/logger.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
    }
    next();
}
app.use(ignoreFavicon);
app.use('/v1', routes);

export default app;