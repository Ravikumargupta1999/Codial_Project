const Post = require('../models/post');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title : "Codial | Home",
    //         posts : posts
    //     });
    // })






    // Post.find({})
    //     .then(posts => {
    //         return res.render('home', {
    //             title: "Codial | Home",
    //             posts: posts
    //         });
    //     })
    //     .catch(err => {
    //         console.log('Error in fetching posts', err);
    //         return;
    //     });







    // populate user of each post

    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })
   
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec()
    .then(posts => {
        res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
    .catch(err => {
        console.error(err);
        // handle error here
    });

}

// module.exports.actionName = function(req,res){}