import express from 'express';
import routes from './routes/v1/index.js';
import logger from '@libs/logger.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', routes);

export default app;