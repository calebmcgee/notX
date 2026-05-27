const db = require('../db/queries');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await db.getUser(email);
                if(!user){
                    return done(null, false, { message: "Incorrect email/password combination"});
                }
                if(user.password != password){
                    return done(null, false, { message: "Incorrect email/password combination"});
                }
                return done(null, user);
            } catch(err) {
                return done(err);
            }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;