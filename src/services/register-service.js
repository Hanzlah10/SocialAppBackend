const { UserRepository } = require('../repositories/index')
// const { post } = require('../routes')
const { ApiError } = require('../utils/apiError')
const { ClientErrorCodes } = require('../utils/errorCodes')
const userRepository = new UserRepository()
// const likeRepository = new LikeRepository()
const register = async (email, password, username, token) => {

    let user = await userRepository.find({
        email: email
    })

    if (user != null) {

        throw new ApiError(ClientErrorCodes.BAD_REQUEST, "User Already Exists ")

    }
    if (!user) {
        // console.log("Thiss is repo")

        let userCreated = await userRepository.create({
            email,
            password,
            username,

        })

        delete await userCreated["password"]

        return userCreated
    }

}

module.exports = {
    register
}