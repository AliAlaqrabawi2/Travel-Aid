const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    profilePicture: {
        type: String,
        default: ""

    }, 
    phoneNumber:{
            type:String 
    } , 
    
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        max: 80
    },
    country :{
        type:String ,
        max:10 ,
    } , 
    city: {
        type: String,
        max: 10,
    }, 
    
}, {
    timestamps: true
})

const User =mongoose.models.User || mongoose.model("User", userSchema)


module.exports = User;