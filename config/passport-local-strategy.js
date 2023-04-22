const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

// authentication using passport
passport.use(new LocalStrategy({
         usernameField: 'email'
    },function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                if (!user || user.password !== password) {
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(function (err) {
                console.log('Error in finding user:', err);
                return done(err);
            });
    }
));


// serializing user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})



// deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(function (err) {
            console.log('Error in finding user:', err);
            return done(err);
        });
});


module.exports = passport;