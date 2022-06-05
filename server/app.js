const express = require('express');
const app = express()  ; 
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv") ; 
const path = require('path');
app.use(cookieParser());
app.use(cors({ origin:true, credentials:true }));
dotenv.config(dotenv); 


// Serve Static File 
app.use("/images",express.static(path.join(__dirname, '/images')));


//Routes 
 const authRoutes = require("./routes/auth");
 const postRoutes = require("./routes/post");
 const userRoutes = require("./routes/user"); 
 const ConversationRouter = require("./routes/conversation") ; 
 const MessageRouter = require("./routes/message");
 const upload = require("./routes/upload")
app.use(express.urlencoded({extended: true}));
app.use(express.json())  ; 



 app.use("/api/auth" , authRoutes); 
 app.use("/api/post", postRoutes);
 app.use("/api/conversation",ConversationRouter) ; 
 app.use("/api/message" , MessageRouter) ;
 app.use("/" ,upload)  ;
 app.use( "/api/users" ,userRoutes);



mongoose.connect(process.env.DATABASEURL).then(_=>{console.log("done")}).catch(err=>{console.log(err)})



app.listen(4000) ;
