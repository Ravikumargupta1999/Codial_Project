const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req, res){
    Post.findById(req.body.post).then (function(post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then (function( comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            }).catch(function(err){
                console.log("Error");
                return;
            });
        }

    }).catch(function(err){
        console.log(err);
        return;
    });
}