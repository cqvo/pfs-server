import logger from '#libs/logger.js';

const clientValidator = {
    get: (req, res, next) => {
        try {

        } catch (error) {
            logger.error(error);
            res.status(400).send(error);
        }
    }
}

export default clientValidator;