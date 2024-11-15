import streamifier from 'streamifier';
import logger from '#libs/logger.js';
import clientModel from './clientModel.js';
import csvParser from 'csv-parser';

const clientService = {
    getClient: async (clientId) => {
        try {
            const clients = await clientModel.findById(clientId);
            return clients[0];
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    transformClientsCsv: async (csv) => {
        try {
            const data = csv.buffer.toString('utf-8');
            const rows = [];
            streamifier.createReadStream(Buffer.from(data))
                .pipe(csvParser({ headers: ['taxdomeId', 'companyName', 'emailAddress'] }))
                .on('data', (row) => {
                    rows.push(row);
                });
            return rows;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
}

export default clientService;