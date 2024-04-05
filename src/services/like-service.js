const { LikeRepository, TweetRepository } = require('../repositories')
const { post } = require('../routes')
const { ApiError } = require('../utils/apiError')
const { ClientErrorCodes } = require('../utils/errorCodes')
const tweetRepository = new TweetRepository()
const likeRepository = new LikeRepository()
async function toggleLike(modelName, modelId, userId) {
    if (modelName !== "Tweet" && modelName !== "Comment") {
        throw new ApiError(ClientErrorCodes.BAD_REQUEST, "Model Name is Not correct", modelName);
    }

    const post = await tweetRepository.getById(modelId);

    const postData = {
        onModel: modelName,
        modelId,
        userId,
    };

    try {
        const existingLike = await likeRepository.find(postData);

        if (existingLike) {
            console.log("Removing like...");
            // await existingLike.remove();
            await likeRepository.delete(existingLike)
            post.likes.pull(existingLike);
        } else {
            console.log("Adding like...");
            const newlike = await likeRepository.create(postData);
            post.likes.push(newlike);
        }

        await post.save();

    } catch (error) {
        // Handle errors from repositories or post saving
        console.error(error);
        // Consider throwing a specific ApiError here
    }
}

module.exports = {
    toggleLike,
};

