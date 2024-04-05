const { registerService } = require("../services");
const { asyncHandler } = require('../utils/asyncHandler')
// require("../")
const { ApiResponse } = require('../utils/apiResponse.js');
const { ApiError } = require("../utils/apiError.js");
const { ClientErrorCodes } = require("../utils/errorCodes.js");

const register = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        throw ApiError(ClientErrorCodes.BAD_REQUEST, "Any one of the field is empty[Username or Password or Email] ")
    }
    const user = req.body

    const createdUser = await registerService.register(user.email, user.password, user.username, user.token)
    console.log(createdUser instanceof ApiError);

    return res.json(
        new ApiResponse(200, "User Registered Successfully", createdUser)
    )
})

module.exports = { register }
