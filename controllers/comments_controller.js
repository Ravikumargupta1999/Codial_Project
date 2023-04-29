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


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then(function(comment){
        if(comment.user == req.user.id)
        {
            let postID = comment.post;

            comment.deleteOne();

            Post.findByIdAndUpdate(postID,{ $pull : { comments: req.params.id }}, function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    }).catch(function(err){
        return res.redirect('back');
    })
}