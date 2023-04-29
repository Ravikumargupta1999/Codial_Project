const Post = require("../models/post")
const Comment = require('../models/comment');

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

module.exports.destroy = function(req, res){
  Post.findById(req.params.id)
  .then(function(post){
      // .id means converting the object id into string
      if (post.user == req.user.id){
          post.deleteOne();

          Comment.deleteMany({post: req.params.id})
           .then(function(){
              return res.redirect('back');
          }).catch(function(err){

          });
      }else{
          return res.redirect('back');
      }

  }).catch(function(err){
    return res.redirect('back')
  });
}