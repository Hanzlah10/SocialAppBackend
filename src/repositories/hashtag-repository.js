const { Hashtag } = require('../models')

const createHashtag = async (hashtag) => {
    try {
        console.log(hashtag)
        const createdHashtag = await Hashtag.insertMany(hashtag)
        return createdHashtag
    } catch (error) {
        throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Creating  Hashtag", error)

    }
}
const getByTagName = async (hashtag) => {
    try {
        const hashtagResponse = Hashtag.find({ title: { $in: hashtag } })

        return hashtagResponse
    } catch (error) {
        throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Fetching  Hashtag", error)
    }
}
const updateById = async (hashtagIdToUpdate, postIdToAdd) => {
    try {
        console.log(hashtagIdToUpdate, postIdToAdd);
        const updatedhashtag = await Hashtag.findOneAndUpdate(
            { _id: hashtagIdToUpdate },
            { $addToSet: { tweets: postIdToAdd } }

        );
        return updatedhashtag
    } catch (error) {
        throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Updating Hashtag", error)
    }
}

module.exports = { createHashtag, getByTagName, updateById }