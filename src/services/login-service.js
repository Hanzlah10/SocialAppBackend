const { UserRepository } = require('../repositories')
const { JWT_KEY } = require('../configs/ServerConfig')
var jwt = require('jsonwebtoken');
const { client } = require('../configs/redis-config');
const { ApiError } = require('../utils/apiError');
const { ClientErrorCodes, ServerErrorCodes } = require('../utils/errorCodes');
const userRepository = new UserRepository()
const signIn = async (userData) => {
  try {
    const user = await userRepository.find({
      email: userData.email
    })
    // console.log("Service Layer", user);
    const passwordMatch = await checkPassword(userData.password, user.password)
    console.log("Password Match", passwordMatch);
    if (!passwordMatch) {
      console.log("Password Doesnt Match");
      throw new ApiError(ClientErrorCodes.UNAUTHORISED, "Password Doesnt Match")

    }
    const newToken = await createToken({ email: user.email, id: user.id })
    console.log(newToken)
    // Redis addition;
    // await client.set(user.id, newToken)
    // console.log(newToken);
    return { token: newToken, email: user.email, username: user.username }
  }
  catch (error) {
    throw error

  }
}
const checkPassword = async (password, encryptedPassword) => {
  try {

    const bcrypt = require('bcryptjs');
    const verified = bcrypt.compareSync(password, encryptedPassword);
    return verified
  } catch (error) {
    // console.log("Something went wrong Incorrect Password");
    throw new ApiError(ServerErrorCodes.INTERNAL_SERVER_ERROR, "Password Check Error ", error)
  }
}

const createToken = async (userData) => {
  try {

    console.log(userData)
    const token = jwt.sign(userData, JWT_KEY)
    return token

  } catch (error) {
    // console.log(error);
    throw error
  }
}

module.exports = { signIn }