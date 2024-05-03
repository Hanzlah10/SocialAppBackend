const { Tweet } = require('../models')
const { ApiError } = require('../utils/apiError')
const { ServerErrorCodes } = require('../utils/errorCodes')
const CrudRepository = require('./crud-repository')
class TweetRepository {

    async createTweet(postData) {
        try {
            const createdPostData = await Tweet.create(postData)
            // if (!postData.imageUrl) {
            //     throw new ApiError(ServerErrorCodes.BAD_REQUEST, "imageUrl is required");
            // }
            return createdPostData
        } catch (error) {
            throw error
        }
    }

    // async get(postData) {
    //     try {
    //         const post = await Tweet.find({
    //             $or: postData
    //         });

    //         return post
    //     } catch (error) {

    //         throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Fetching a Post", error)
    //     }
    // }

    async get(postData) {
        try {
            // Assuming postData contains the current user's ID
            const currentUser = postData.userid;

            // Retrieve the list of users that the current user is following
            const followingUsers = await User.findOne({ _id: currentUser }).select('following');

            // Extract user IDs from the followingUsers array
            const followingUserIds = followingUsers.following;

            // Fetch tweets from users that the current user is following
            const posts = await Tweet.find({ user: { $in: followingUserIds } });

            return posts;
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Fetching Posts", error);
        }
    }


    async getById(postId) {
        try {
            const post = await Tweet.findById({
                _id: postId
            })
            return post
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Fetching a Post by Id", error)
        }
    }

    async commentById(postToUpdate, fieldId, fieldName) {
        try {
            let updateObject = {};
            updateObject["comment"] = fieldId;
            const post = await Tweet.findOneAndUpdate(
                { _id: postToUpdate },
                { $addToSet: updateObject }

            );

            return post
        } catch (error) {
            throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Error While Updating a Post", error)
        }


    }
}

module.exports = TweetRepository