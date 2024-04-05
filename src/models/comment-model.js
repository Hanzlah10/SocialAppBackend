const mongoose = require('mongoose')
const { Schema } = mongoose
const CommentSchema = new Schema({
    onModel: {
        type: String,
        enum: ["Tweet", "Comment"],
        required: true,

    },
    modelId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "onModel"
    }
    ,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    content: {
        type: String,
        required: true,
    },
    comment: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'

    }]

}, {
    timestamp: true
})
const Comment = mongoose.model('Comment', CommentSchema);

module.exports =
    Comment