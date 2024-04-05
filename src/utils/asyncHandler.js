const { ApiError } = require("./apiError");
const { ApiResponse } = require('./apiResponse')
const asyncHandler = (requestFunction) => {
    return async (req, res, next) => {
        try {
            await requestFunction(req, res, next); // Call the provided requestFunction with req, res, and next
        } catch (error) {
            if (error instanceof ApiError) {
                // console.log('klsngkglndfjklb')
                // console.log(error, "bdjf");
                res.status(error.statusCode).json({ success: false, message: error.message, error: error.errors });
            }
            else {
                // If it's not an instance of ApiError, create a generic error response
                console.log(error);
                const errorMessage = error.message || "Internal Server Error";
                const errorCode = error.code || 500; // Assuming you have a custom error code property
                const apiResponse = new ApiResponse(errorCode, errorMessage, null, {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
                return res.status(errorCode).json(apiResponse);
            }
        }
    };
};
module.exports = { asyncHandler }