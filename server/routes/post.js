const router = require("express").Router();  
const Post = require("../Model/Post") ; 
const verify = require("../MiddleWare/Verify");
// create Post 

router.post("/create" ,async (req,res)=>{ 
     
    const {desc , img , currentCountry , travelingCountry ,weightItem ,quantity , User , takeAnItem ,product , phoneNumber} = req.body ; 
    try {
            const newPost = new Post({
                desc:desc , 
                postImg:img , 
                phoneNumber:phoneNumber , 
                currentCountry:currentCountry , 
                travelingCountry :travelingCountry , 
                weightItem :weightItem , 
                quantity :quantity , 
                product:product ,
                takeAnItem:takeAnItem, 
                User:User  
            }) ; 

            const SavedPost  = await newPost.save(); 
            res.status(200).json(SavedPost)
    } 
    catch(err){
        res.status(500).json({msg:err.message}); 
    }
})


//Get All Post 

router.get("/GetAllPost", async(req,res)=>{
    try { 
        const Posts = await Post.find().populate("User"); 
        res.status(200).json(Posts)

    } 
    catch(err){
        res.status(500).json({msg:err.message});
    }
}) ; 


//Get Unique Post 

router.get("/:id" ,  async(req,res)=>{
    try {
        const Posts = await Post.findOne({_id:req.params.id}).populate("User") ;
        res.status(200).json(Posts);
    }  
    catch(err){
        res.status(500).json({msg:err.message});

    }
})  


//get Profile Post  
router.get("/profile/:id",async(req,res)=>{
    try {
        const Posts = await Post.find({User:req.params.id}).populate("User");
        res.status(200).json(Posts);
    } 
    catch(err) {
        res.status(500).json({msg:err.message});
        
    }

})







// Delete Post 


router.delete("/:id"  , verify , async (req,res)=>{
    try { 
        console.log(req.body)
        if (req.user._id ===req.body.userId){
        const post = await Post.findByIdAndDelete({_id:req.params.id}); 
        res.status(200).json("Post Deleted"); 
        }
        else {
            res.status(400).json("You Cant Delete This Post ");
        }

    } 
    catch(err){
        res.status(500).json({msg:err.message});
    }
})

//search Post 

router.post("/searchPost",async(req,res)=>{
    const travelingCountry = req.body.search;
    const posts = await Post.find({travelingCountry}).populate("User")
    try {
        res.status(200).json(posts); 
    }
    catch(err){
        res.status(500).json("No Result Found");
    }

})


module.exports =router ;
