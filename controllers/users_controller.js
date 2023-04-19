// module.exports.profile = function(req,res){
//     res.end('<h1> User Profile </h1>');
// }
module.exports.profile = function(req,res){
    return res.render('home',{
        title : "User Profile"
    });
}
