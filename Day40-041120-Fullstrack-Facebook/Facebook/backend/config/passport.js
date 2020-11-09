const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const targetUser = await db.User.findOne({ where: { id: payload.id } });
    console.log(targetUser, payload)
    if (targetUser) {
      console.log(new Date(payload.createdAt), typeof new Date(payload.createdAt), targetUser.updatedAt, typeof targetUser.updatedAt);
      if (new Date(payload.createdAt) < targetUser.updatedAt) {
        done(null, false)
      } else {
        done(null, targetUser)
      }
    } else {
      done(null, false)
    }
  } catch (err) {
    done(err)
  }
})

passport.use("jwt", jwtStrategy);