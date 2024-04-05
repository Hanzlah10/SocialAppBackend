const { CommentService } = require('../services')
const { ApiError } = require('../utils/apiError')
const { ApiResponse } = require('../utils/apiResponse')
const { asyncHandler } = require('../utils/asyncHandler')
const { SuccessCodes, ClientErrorCodes } = require('../utils/errorCodes')
const createComment = asyncHandler(async (req, res) => {

    const commentData = req.query
    if (!commentData.modelid || !commentData.modelname || !commentData.content || !req.id) {
        throw new ApiError(ClientErrorCodes.BAD_REQUEST, "Some of the Comment fields are Empty ")
    }
    const createdComment = await CommentService.createComment(commentData.modelname, commentData.modelid, req.userid, commentData.content)
    return res.json(
        new ApiResponse(SuccessCodes.CREATED, "Comment Created Succesfully", createdComment)
    )

})
module.exports = { createComment }