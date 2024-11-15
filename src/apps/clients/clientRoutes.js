import express from 'express';
import multer from 'multer';

import controller from './clientController.js';

const router = express.Router();
const upload = multer();

router.route('/')
    .get(controller.getAllClients)

router.route('/:clientId')
    .get(controller.getClient);

router.route('/upload')
    .post(upload.single('csvFile'), controller.processClientsCsv);

export default router;