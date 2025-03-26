import { ZodError } from "zod";
import  HttpError from '../utils/HttpError.js' // Ensure you have this utility
import { STATUS_CODES } from "../constants/constants.js";

const notFound = (req, res, next) => {
  const error = new HttpError(`${req.originalUrl} : Not Found`, STATUS_CODES.NOT_FOUND);
  next(error);
};

const handleZodError = (err) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: BAD_REQUEST,
    body: {
      errors,
      message: "Validation Error",
    },
  };
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  return res.status(STATUS_CODES.SERVER_ERROR).json({
    message: "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default { errorHandler, notFound };
