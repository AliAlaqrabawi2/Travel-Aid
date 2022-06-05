const router = require("express").Router(); 
const Conversation = require("../Model/Conversation");

//create conversation 

router.post("/", async(req,res)=>{
    console.log(req.body);


    const isConversation =await Conversation.find({
        members:{$all:[req.body.senderId,req.body.receiverId]}
    }).populate({path:"members" ,select:"-password"});
    
    if (isConversation.length>0){
       return  res.status(203).json({isConversation ,newChat:false});
    
    }
   
    else {
        const newConversation = new Conversation({
            members:[req.body.senderId, req.body.receiverId] 
        })  ; 
        const savedConversation = await newConversation.save()
        await savedConversation.populate({path:"members" , select:"-password"}); 
        
        return  res.status(200).json({savedConversation ,newChat:true});
 
    }


   
}) ;


//get Conversation 
router.get("/:userId" ,async(req,res)=>{

    try { 
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        }).populate({path:"members" ,select:"-password"}); 
        res.status(200).json(conversation);

    } 
    catch(err){
        res.status(500).json({msg:err.message});
    }

})

router.delete("/deleteConversation",async(req,res)=>{
    const id = req.body.id ;
    console.log(id);
        try {
                const c =await Conversation.findByIdAndDelete(id) 
                res.status(200).json("Deleted");
        } 
        catch(err) {
            res.status(500).json(err) ; 
        }


})


module.exports =router;
