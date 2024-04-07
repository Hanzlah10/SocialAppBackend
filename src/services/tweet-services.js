const { TweetRepository, HashTagRepository } = require('../repositories/index')
const { ApiError } = require('../utils/apiError')
const { ServerErrorCodes } = require('../utils/errorCodes')
const Tweet = new TweetRepository()

const create = async (postData) => {

    try {
        console.log(postData)
        const str = postData.content
        const createdPost = await Tweet.createTweet(postData)
        console.log(createdPost);
        const hashtagsArr = str.match(/#([a-zA-Z])\w+/g)
        const existingHashtags = await HashTagRepository.getByTagName(hashtagsArr)
        const hashtag = existingHashtags.map(tag => tag.title)
        if (hashtagsArr) {

            var currentHashtags = hashtagsArr.filter(tag => !hashtag.includes(tag))

            const newHashtags = currentHashtags.map(tag => ({ title: tag }))

            const createdHashtag = newHashtags ? await HashTagRepository.createHashtag(newHashtags) : []
            const hashID = [...existingHashtags, ...createdHashtag].map(tag => tag.id)

            hashID.forEach(async (hashId) => {
                await HashTagRepository.updateById(hashId, createdPost.id)
            })

        }
        return createdPost
    } catch (error) {
        console.log(error, "This is a tweet error ")
        throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error in creating Post", error)
    }
}

module.exports = { create }