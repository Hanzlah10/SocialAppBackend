const { User } = require('../models');
const { ApiError } = require('../utils/apiError');
const { ClientErrorCodes } = require('../utils/errorCodes');

const followUser = async (currentUserId, userIdToFollow) => {
    try {
        // Check if the user to follow exists
        const userToFollow = await User.findById(userIdToFollow);
        const currentUser = await User.findById(currentUserId);


        // Check if the user is already being followed
        if (currentUser.following.includes(userToFollow._id)) {
            throw new ApiError(ClientErrorCodes.BAD_REQUEST, "User is already being followed");
        }

        // Add userIdToFollow to the following array of the current user
        currentUser.following.push(userIdToFollow);
        await currentUser.save();

        // Optionally, you may want to update the followers array of the user being followed
        // userToFollow.followers.push(currentUser._id);
        await userToFollow.save();

        // Return any relevant data
        return { success: true, message: 'User followed successfully' };
    } catch (error) {
        throw new ApiError(ClientErrorCodes.INTERNAL_SERVER_ERROR, "Error while following user", error);
    }
};

module.exports = {
    followUser
};
