const { User } = require('../models');

class FollowRepository {
    async addFollowing(userId, userToFollowId) {
        return await User.findByIdAndUpdate(userId, { $addToSet: { following: userToFollowId } });
    }
    // async addFollower(userId, followerId) {
    //     return await User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } });
    // }
}

module.exports = FollowRepository;
