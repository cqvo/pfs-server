import clientService from '../clients/clientService.js';
import linkService from './linkService.js';
import linkModel from './linkModel.js';
import plaid from '@libs/plaid';

const linkController = {
    createLinkRequest: async (req, res) => {
        try {
            const clientId = req.body['clientId'];
            const client = await clientService.getClient(clientId);
            const payload = await linkService.constructPayload(client);
            const response = await plaid.linkTokenCreate(payload);
            const request = { 'client_id': clientId, ...response.data };
            const values = await linkService.constructLink(request);
            const link = await linkModel.addLink(values);
            res.status(201).json(link);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getLinkRequest: async (req, res) => {
        try {
            const link = linkService.getLinkRequest(req.params['linkId']);
            res.status(200).json(link);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    webhookHandler: async (req, res) => {
        try {
            const type = req.body['webhook_type'];
            const code = req.body['webhook_code'];
            if (type === 'LINK') {
                if (code === 'SESSION_FINISHED') {
                    res.status(200).end()
                }
                if (code === 'ITEM_ADD_RESULT') {
                    const linkPlaidId = req.body['link_token'];
                    const link = await linkModel.findByLinkToken(linkPlaidId);
                    const publicToken = req.body['public_token'];
                    const response = await plaid.itemPublicTokenExchange(publicToken);
                    const request = {
                        'client_id': link.clientId,
                        ...response.data
                    };
                    const values = await linkService.constructItem(request);
                    const item = await linkModel.upsertItem(values);
                    res.status(200).end()
                }
                if (code === 'EVENTS') {
                    res.status(200).end()
                }
            }
            if (type === 'ITEM') {
                if (code === 'ERROR') {
                    res.status(200).end()
                }
                if (code === 'LOGIN_REPAIRED') {
                    res.status(200).end()
                }
                if (code === 'NEW_ACCOUNTS_AVAILABLE') {
                    res.status(200).end()
                }
                if (code === 'PENDING_DISCONNECT') {
                    res.status(200).end()
                }
                if (code === 'PENDING_EXPIRATION') {
                    res.status(200).end()
                }
                if (code === 'USER_PERMISSION_REVOKED') {
                    res.status(200).end()
                }
                if (code === 'USER_ACCOUNT_REVOKED') {
                    res.status(200).end()
                }
                if (code === 'WEBHOOK_UPDATE_ACKNOWLEDGE') {
                    res.status(200).end()
                }
            }
            else {
                res.status(400).end();
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default linkController;