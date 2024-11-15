import express from 'express';

import controller from './linkController.js';
import { webhookValidator } from './linkValidator.js';

const router = express.Router();

router.route('/:linkId')
    .get(controller.getLinkRequest)

router.route('/create')
    .post(controller.createLinkRequest);

router.route('/')
    .post(controller.webhookHandler);


export default router;