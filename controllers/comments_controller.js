const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post);
      if (post) {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
  
        post.comments.push(comment);
        await post.save();
  
        console.log("Kya hua");
        await  comment.populate('user',{ name: 1 , email:1 });
        // await Comment.populate('user', 'name email').execPopulate();
  
        // commentsMailer.newComment(comment);
        let job = queue.create('emails',comment).save(function(err){
          if(err){
            console.log('Error in creting a queue');
            return;
          }

          console.log('job enqueued',job.id);
        });
  
        req.flash('success', 'Commented!');
        res.redirect('/');
      }
    } catch (err) {
      req.flash('err', err);
      console.log(err);
    }
  };
  
  
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then(function(comment){
        if(comment.user == req.user.id)
        {
            let postID = comment.post;

            comment.deleteOne();
            req.flash('success','Comment deleted');
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