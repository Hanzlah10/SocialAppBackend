const mongoose = require('mongoose');
const { Schema } = mongoose
const { Hashtag } = require('./hastag-model');
const { Like, Comment } = require('./index');

const TweetSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Like
    }],
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Hashtag
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Comment
        }
    ],
    imageUrl: {
        type: String,
        // required: true
    }
}, {
    versionKey: false
})
const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports =
    Tweet
