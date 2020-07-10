const { Strategy,ExtractJwt} = require('passport');
const User = require('../models/user');
const { SECRET } = require('../config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret:SECRET
}
module.exports = (passport) => {
    passport.use(new Strategy(options, async (payload, done) => {
        await User.findById(payload.user_id).then(async user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(e => {
            return done(null, false);
        })
    }))
}