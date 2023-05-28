const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) =>{
    // console.log('inside new comment mailer',comment);

    // console.log('inside new -----------comment mailer',comment.user,comment._id);

    // console.log('Sending mail to', comment.user,comment.user.email);


    let htmlsString = nodemailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from : "guptaravi3217@gmail.com",
        to : comment.user.email,
        subject : "New Comment Published",
        html : htmlsString
    }, (err, info) => {
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        // console.log('Message sent',info);
        return;
    })
}