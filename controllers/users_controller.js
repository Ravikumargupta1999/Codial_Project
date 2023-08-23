const { model } = require('mongoose');
const User = require('../models/user')
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body).then(function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
        // return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){

                if(err){
                    console.log('*****Multer Error :',err);
                }

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){


                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                    }
                    // saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(error){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unautho-rized');
        return res.status(401).send('Unaaaauthorized');
    }
    
}

// rendering sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "META | Sign UP"
    })
};

// rendering sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "META | Sign In"
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