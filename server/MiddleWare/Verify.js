const jwt = require("jsonwebtoken") ;

module.exports =function verify(req,res ,next){

    const token = req.cookies.token  
    if (!token) { 
        
        return res.status(401).json("access Denied")
    }  
    try { 
        const verify = jwt.verify(token,process.env.TOKEN_SECRET) ;  
        req.user = verify;
            next();
    } 
    catch (err) {
        res.status(404).json("invalid Token") ;
    }

}
