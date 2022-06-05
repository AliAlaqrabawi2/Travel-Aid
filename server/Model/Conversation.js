const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({ 
     
    members :[{
        type:mongoose.Types.ObjectId ,
        ref:"User" , 
    required:true
 } , 
]

} ,{timestamps:true}) ;



module.exports = mongoose.model("conversation",ConversationSchema)

