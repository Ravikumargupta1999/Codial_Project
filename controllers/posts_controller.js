const Post = require("../models/post")

module.exports.create = async function(req,res){
    // Post.create({
    //     content : req.body.content,
    //     user : req.user._id
    // }, function(err,post){
    //     if(err){
    //         console.log('Error in creating post');
    //         return;
    //     }

    //     return res.redirect('back');
    // })
    try {
        const post = await Post.create({
          content: req.body.content,
          user: req.user._id
        });
        return res.redirect('back');
      } catch (err) {
        console.log('Error in creating post', err);
        return;
      }
      
}