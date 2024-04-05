const { followService } = require("../services");
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/apiResponse.js');
const { ApiError } = require("../utils/apiError.js");
const { ClientErrorCodes } = require("../utils/errorCodes.js");

const follow = asyncHandler(async (req, res) => {
    const currentUser = req.userid; // Assuming user object is available in request
    console.log(currentUser + " from controller")
    const userIdToFollow = req.params.userId;

    if (!userIdToFollow) {
        throw ApiError(ClientErrorCodes.BAD_REQUEST, "User ID to follow is missing");
    }

    await followService.followUser(currentUser, userIdToFollow);

    return res.json(
        new ApiResponse(200, "User followed successfully")
    );
});

module.exports = { follow };
