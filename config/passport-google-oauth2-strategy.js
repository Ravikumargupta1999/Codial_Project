const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
// passport.use(new googleStrategy({
//         clientID: "871165748594-3q98kjuvekg2pocoj9vlbc3sg2k8a0k5.apps.googleusercontent.com",
//         clientSecret : "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",
//         callbackURL : "http://localhost:8000/users/auth/google/callback",
//     },

//     function(accessToke,refreshToken,profile,done){
//         // find a user
//         User.findOne({email: profile.emails[0].value}).exec(function(err,user){
//             if(err){
//                 console.log('error in google strategy-passport',err);
//                 return;
//             }
//             console.log(profile);

//             if(user){
//                 // if found,set this user AS req.user
//                 return done(null,user);
//             }else{
//                 // if not found
//                 User.create({
//                     name : profile.displayName,
//                     email : profile.emails[0].value,
//                     password : crypto.randomBytes(20).toString('hex')
//                 }, function(err,user){
//                     if(err){
//                         console.log('error in creating user',err);
//                         return;
//                     }else{
//                         return done(null,user);
//                     }
//                 })
//             }
//         })
//     }
    

// ))


passport.use(
    new googleStrategy(
      {
        clientID: "871165748594-3q98kjuvekg2pocoj9vlbc3sg2k8a0k5.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value }).exec();
          console.log(profile);
  
          if (user) {
            // if found, set this user as req.user
            return done(null, user);
          } else {
            // if not found
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            });
  
            return done(null, newUser);
          }
        } catch (err) {
          console.log('error in google strategy-passport', err);
          return done(err);
        }
      }
    )
  );
  



module.exports = passport;