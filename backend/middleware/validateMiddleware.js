import { STATUS_CODES } from '../constants/constants.js';
import errorHandler from '../middleware/errorHandler.js'; // Import the error handler

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const err = new Error("Validation Failed");
        err.statusCode = STATUS_CODES.BAD_REQUEST;
        err.errors = result.error.errors.map((e) => e.message);
        return errorHandler.errorHandler(err, req, res, next); // Use errorHandler directly
    }

    req.body = result.data;
    next();
};

export default validate;
