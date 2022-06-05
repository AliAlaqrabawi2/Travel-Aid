const router = require("express").Router(); 
const Message = require("../Model/Message");

//create Message 

router.post("/", async(req,res)=>{
    const newMsg = new Message({
        conversationId:req.body.conversationId  ,
        sender:req.body.sender , 
        text:req.body.text

    })  ;
    try {
        const savedMsg = await newMsg.save(); 
        res.status(200).json(savedMsg);
        
    }
    catch(err){
        res.status(500).json("SomeThing Wrong");
    }

}) ;


//get Message 
router.get("/:conversationId" ,async(req,res)=>{

    try { 
        const msg = await Message.find({
            conversationId:req.params.conversationId
        }) ; 
        res.status(200).json(msg);

    } 
    catch(err){
        res.status(500).json("Can't Get msg");
    }

})



module.exports =router;
