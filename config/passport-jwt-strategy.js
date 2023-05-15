const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
 

const User = require('../models/user')


let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codial'
}


// passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
//     User.findById(jwtPayLoad._id,function(err,user){
//         if(err){
//             console.log('Error in finding user from JWT');
//             return ;
//         }
//         if(user){
//             return done(null,user);
//         }else{
//             return done(null,false);
//         }
//     });
// }))


passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log('Error in finding user from JWT:', error);
      return done(error, false);
    }
  })
);

module.exports = passport;