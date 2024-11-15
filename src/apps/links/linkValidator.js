const webhookResponses = {
    'LINK': {
        'SESSION_FINISHED': 200,
        'ITEM_ADD_RESULT': 200,
        'EVENTS': 200
    },
    'ITEM': {
        'ERROR': 200,
        'LOGIN_REPAIRED': 200,
        'NEW_ACCOUNTS_AVAILABLE': 200,
        'PENDING_DISCONNECT': 200,
        'PENDING_EXPIRATION': 200,
        'USER_PERMISSION_REVOKED': 200,
        'USER_ACCOUNT_REVOKED': 200,
        'WEBHOOK_UPDATE_ACKNOWLEDGE': 200
    }
};

export const webhookValidator = (req, res, next) => {
    const type = req.body['webhook_type'];
    const code = req.body['webhook_code'];
    if (type === 'LINK') {
        if (code === 'SESSION_FINISHED') {

        }
    }
    if (type === 'ITEM') {

    }
    // const typeResponse = webhookResponses[req.body['webhook_type']];
    //
    // if (!typeResponse) {
    //     return next();  // Continue if no type match
    // }
    //
    // const statusCode = typeResponse[req.body['webhook_code']];
    // if (statusCode) {
    //     res.status(statusCode).end();
    // }
    else {
        res.status(400).end();  // Bad request for unknown code
    }
}