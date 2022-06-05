const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({ 
    conversationId: {
        type:mongoose.Types.ObjectId , 
        ref:"conversation"
    } ,
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User" 
    } ,
    text:{
        type:String, 
    } 

} ,{timestamps:true}) ;



module.exports = mongoose.model("message",MessageSchema)