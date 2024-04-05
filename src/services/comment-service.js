const { CommentRepository, TweetRepository } = require('../repositories')
const { ApiError } = require('../utils/apiError')
const { ServerErrorCodes } = require('../utils/errorCodes')
const commentRepository = new CommentRepository()
const tweetRepository = new TweetRepository()
const createComment = async (modelName, modelId, userId, content) => {
    try {
        const comment = {
            onModel: modelName,
            modelId: modelId,
            userId: userId,
            content: content
        }
        const createdComment = await commentRepository.create(comment)
        console.log("Comment Service ", createdComment)
        if (comment.onModel == "Tweet") {
            const commentOnPost = await tweetRepository.commentById(modelId, comment.id)
        }
        else if (comment.onModel == "Comment") {
            const commentOnComment = await commentRepository.commentById(modelId, comment.id)
        }
        return createdComment

    } catch (error) {
        throw ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Creating Comments ", error)
    }
}
module.exports = {
    createComment
}