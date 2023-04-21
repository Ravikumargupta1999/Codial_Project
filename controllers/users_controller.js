module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "User Profile"
    });
}

// rendering sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Codial | Sign UP"
    })
};

// rendering sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "Codial | Sign In"
    })
};