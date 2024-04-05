const { tweetService } = require("../services")
const { asyncHandler } = require("../utils/asyncHandler")
const { ClientErrorCodes, SuccessCodes } = require("../utils/errorCodes")
const { ApiError } = require('../utils/apiError')
const { ApiResponse } = require("../utils/apiResponse")
const createTweet = asyncHandler(async (req, res) => {
    try {
        const data = req.body
        // console.log(req.file)
        // if (req.file == undefined) {
        //     console.log('fds');
        //     throw new ApiError(ClientErrorCodes.BAD_REQUEST, "File Required")
        // }
        data.imageUrl = req.file.location
        console.log(data, req.file, "inj")
        const response = await tweetService.create(data)
        return res.status(201).json(
            new ApiResponse(SuccessCodes.CREATED, "Post Created Succesfully", response)
        );

    } catch (error) {

    }
})
module.exports = { createTweet }