const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    following:
        [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
}, {
    timestamps: true // Corrected placement of timestamps
});
UserSchema.pre('save', function (next) {
    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})
const User = mongoose.model('User', UserSchema);

module.exports = User;
