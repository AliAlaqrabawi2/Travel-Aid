const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({ 
    User:{
        type:mongoose.Types.ObjectId , 
        ref:"User" ,  
        required:true ,
    } , 
    desc:{
        type:String ,
        max:150 ,
        required:true ,
    }  , 
    currentCountry :{
        type:String ,  
        required:true, 
    } , 
    travelingCountry : {
        type:String ,
        require:true, 
    } , 
    weightItem:{
        type:Number ,
        required:true,
    } , 
    quantity:{
        type:Number , 
        required:true , 
    } , 
    postImg:{
        type:String, 
        default:""
    } , 
    takeAnItem:{
        type:Boolean , 
        default:false  ,
        required:true, 
    } , 
    product:{
        type:String ,
        required:true        
    } , 
    phoneNumber:{
        type:String ,
        required:true        

    }

} ,{timestamps:true}) ;



module.exports = mongoose.model("post",PostSchema)

