import logger from '$libs/logger.js';
import clientService from './clientService.js';
import clientModel from './clientModel.js';

const clientController = {
    getClient: async (req, res) => {
        try {
            const client = await clientService.getClient(req.params['clientId']);
            res.status(200).json(client);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getAllClients: async (req, res) => {
        try {
            const clients = clientModel.findAll();
            res.status(200).json(clients)
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    processClientsCsv: async (req, res) => {
        try {
            const data = await clientService.transformClientsCsv(req.file);
            const clients = await clientModel.addClients(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default clientController;