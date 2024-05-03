const passport = require("passport")
const { client } = require('../configs/redis-config');
const { ApiError } = require("../utils/apiError");
const { ClientErrorCodes } = require("../utils/errorCodes");

const authentication = (req, res, next) => {
    passport.authenticate('jwt', async (err, user) => {

        if (!user) {
            return res.json(new ApiError(ClientErrorCodes.UNAUTHORISED, "Authorization Token Failed"));
        }

        req.userid = user.id;
        // console.log(req.body + "from middle")
        // console.log(req.body.content + "egegd")
        // console.log(req.userid + " from middleware")
        next();
    })(req, res, next);
};
module.exports = { authentication }




// const token = req.headers.authorization.split(' ')[1];
// const redisToken = await client.get(user.id)
// console.log(redisToken)
// if (err) next(err)
// if (redisToken !== token) {
//     return res.json(new ApiError(ClientErrorCodes.UNAUTHORISED, "Authorization Token Failed"))
// }