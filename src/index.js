import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import logger from '@libs/logger.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}`);
});