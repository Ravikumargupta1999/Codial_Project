const Post = require('../models/post');
const User = require('../models/user')

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
    //     User.find({},function(err,users){
    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts:  posts,
    //             all_users: users
    //         });
    //     })   
       
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
    return User.find({})
      .then(users => {
        return res.render('home', {
          title: "Codeial | Home",
          posts: posts,
          all_users: users
        });
      });
  })
  .catch(err => {
    console.error(err);
  });


}

// module.exports.actionName = function(req,res){}