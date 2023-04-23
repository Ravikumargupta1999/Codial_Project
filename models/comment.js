const mongoose = require('mongoose');

const commonSchema = new mongoose.Schema({
    content :{
        type:String,
        required : true
    },
    // comments belongs to user
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post :{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    timestamps:true
})

const Comments = mongoose.model('Comment',commonSchema);

module.exports = Comments;