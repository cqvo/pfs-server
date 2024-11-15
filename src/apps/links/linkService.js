import logger from '#libs/logger.js';
import linkModel from './linkModel.js'

const linkService = {
    constructPayload: async (client) => {
        try {
            return {
                user: {
                    client_user_id: client.taxdomeId,
                    email_address: process.env.PLAID_EMAIL || client.emailAddress,
                },
                products: ['assets'],
                client_name: process.env.PLAID_CLIENT_NAME || 'PFS 360',
                language: 'en',
                country_codes: ['US'],
                webhook: process.env.WEBHOOK,
                // TODO: Remove before launch
                // hosted_link: {
                //     delivery_method: 'email'
                // },
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    constructLink: async (request) => {
        try {
            return {
                linkToken: request['link_token'],
                clientId: request['client_id'],
                requestId: request['request_id'],
                expiration: request['expiration'],
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    getLinkRequest: async (linkId) => {
        try {
            return await linkModel.findById(linkId);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
    constructItem: async (request) => {
        try {
            return {
                plaidId: request['item_id'],
                clientId: request['client_id'],
                accessToken: request['access_token'],
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    },
}

export default linkService;