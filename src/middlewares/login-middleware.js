const { JWT_KEY } = require('../configs/ServerConfig')
var jwt = require('jsonwebtoken');
const verifyJwt = (req, res, next) => {
    var token = req.headers.token
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(403).send({ success: false, message: "Failed to authenticate user." })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(403).send({ success: false, message: "No Token Provided." })
    }
}
module.exports = verifyJwt