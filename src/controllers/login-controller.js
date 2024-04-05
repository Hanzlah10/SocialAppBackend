const { loginService } = require('../services/index');
const { ApiError } = require('../utils/apiError');
const { ApiResponse } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const { SuccessCodes, ClientErrorCodes } = require('../utils/errorCodes');

const signIn = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new ApiError(ClientErrorCodes.BAD_REQUEST, "Email Or Password is Blank")
  }
  const loggedIn = await loginService.signIn(req.body);
  // console.log(loggedIn);
  return res.json(
    new ApiResponse(SuccessCodes.CREATED, "User Logged In Successfully", loggedIn));

}
)
module.exports = { signIn }