const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){
    
    try{
        // console.log('Hill')
        console.log('*****************************',req.params.id);
        let post = await Post.findById(req.params.id);
        console.log(post)
        console.log(post.user,req.user.id);
        if (post.user == req.user.id){
            console.log('HHHHHHHHHHhhh')
            await post.deleteOne();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                console.log(req.params.id);
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        console.log('HHHHHHHHHHhhsaaaadsasssssssssssh')
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
    }
    
}