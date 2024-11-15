import logger from '@libs/logger';

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