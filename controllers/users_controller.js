const { model } = require('mongoose');
const User = require('../models/user')

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
    .then(function(user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user : user
        });
    }).catch(function(err){
        return res.redirect('back');
    });
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then(function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// rendering sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codial | Sign UP"
    })
};

// rendering sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    })
};


// get the sign up data for user
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user)
            return await res.redirect('back');

        try {
            User.create(req.body);

            return res.redirect('/users/sign-in');
        }
        catch (err) {
            console.log('error in creating user while signing up');
        }
    }
    catch (err) {
        console.log('error in finding user in signing up');
    }
}



// get the sign in data for user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged In Successfully');
    return res.redirect('/')
}

module.exports.destroySession = function (req, res, next) {
  

    req.logout(function (err) {

        if (err) { return next(err); }
        req.flash('success','You Have logged out');
        res.redirect('/');
    });

}