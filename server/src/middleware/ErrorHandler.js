import { errorResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    return errorResponse(
        res,
        err.message || "Internal Server Error",
        statusCode
    );

};

export default errorHandler;