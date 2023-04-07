const mongoose = require('mongoose')
Schema = mongoose.Schema


const postSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' 
    },
    likes : [
        {type : mongoose.Schema.Types.ObjectId , ref : 'User'} 
    ], 
    comments : [ 
        {commentbyid : {type : mongoose.Schema.Types.ObjectId , ref : 'User'} , 
        comment : {type : String }}
    ], 
    date :{
        type : Date , 
        Default : Date.now 
    }, 
    desc : {
        type : String , 
    },
    video  : {
        type : String 
    }

})


module.exports = mongoose.model('Posts', postSchema);