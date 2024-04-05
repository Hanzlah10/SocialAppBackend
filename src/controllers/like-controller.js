const { likeService } = require("../services");
const { asyncHandler } = require("../utils/asyncHandler");
const { SuccessCodes } = require("../utils/errorCodes");
const { ApiResponse } = require('../utils/apiResponse')
const toggleLike = asyncHandler(async (req, res) => {

    const likeData = req.query
    const likeResponse = likeService.toggleLike(likeData.modelname, likeData.modelid, req.userid)
    return res.json(
        new ApiResponse(SuccessCodes.OK, "Like Toogle Successful", likeResponse)
    );

})
module.exports = { toggleLike }
