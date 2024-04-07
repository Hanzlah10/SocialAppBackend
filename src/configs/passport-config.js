

// const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models'); // Assuming you have a User model
const { JWT_KEY } = require('./ServerConfig');
const { client } = require('./redis-config');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_KEY,
};
const passportAuth = (passport) => {


    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        // console.log("Inside JWT  Strategy")
        const user = await User.findById(jwt_payload.id);

        // const token = await client.get(jwt_payload.id)



        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    }));
};



module.exports = { passportAuth };