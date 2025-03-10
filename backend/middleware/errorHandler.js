import { STATUS_CODES } from '../constants/constants.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || STATUS_CODES.SERVER_ERROR;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
