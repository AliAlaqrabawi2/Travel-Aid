const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt"); // Async Fucntion 
const jwt = require("jsonwebtoken");
const verify = require("../MiddleWare/Verify.js");

router.post("/register", async (req, res) => { 
  const {email ,password, username} = req.body  ; 
  try {
    const user = await User.find({email:email});   
    console.log(user);
    if (user.length>0){
    return   res.status(400).json("This Email is already exists"); 

    } 
    const hashPassword = await bcrypt.hash(password, 10) ;

    const newUser = new User ({
      email:email , 
      password:hashPassword , 
      username:username 
    }) ;  
      await newUser.save();
      const token = jwt.sign(newUser.toJSON() ,process.env.TOKEN_SECRET);
          res.cookie("token" , token , {httpOnly:true,}) ; 
  
   return  res.status(200).json({newUser:newUser ,token:token} );
  } 

  catch(err){
    console.log("error message")
    return res.status(500).json({msg:err.message});
  }
});

router.post("/login", async (req, res) => {

  const {email ,password} = req.body ; 
  try {
    const user = await User.findOne({email:email}) ;
    if (!user){
     return res.status(400).json({msg:"this email is not exist"})
    }
    const isMatch= await bcrypt.compare(password ,user.password ) ;
    if(isMatch){
      const token = jwt.sign(user.toJSON() , process.env.TOKEN_SECRET ,  {
        expiresIn: "2h",
      }) ; 
      res.cookie("token" ,token ,{httpOnly:true  ,
        maxAge: 2 * 60 * 60 * 1000
        });
      res.status(200).json({msg:"loginSucsess" ,user});

    } 
    else {
      res.status(400).json({msg:" password Is Not Correct"})
    }
  } 
  catch(err){
    res.status(500).json({msg:err.message}); 
  }


}); 



router.get("/logout",(req,res)=>{
  try {
  res.clearCookie('token'); 
  delete req.user ;
  res.send("logout!!");
  } 
  catch (err){
    res.status(500).json({msg:err.message});
  }

}); 

router.get("/islogin" ,verify, async(req,res)=>{ 

  try {
    const user = await User.findOne({_id:req.user._id});
    const {password, ...others} = user._doc ;
    res.status(200).json(others); 
  }
  catch(err){
    res.status(401).json("Not Authraized");

  }
})

module.exports = router;
