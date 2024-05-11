const jwt = require('jsonwebtoken')

const localStorageWithAuth = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid Auth Toekn"})
    }
    try{
        const data = jwt.verify(token,"MyNameIsProdDeveloper#1");
        req.user = data.user
        next();
    }catch(err){
        res.status(401).send({error:"Invalide Auth Token"})
    }
    
}
module.exports = localStorageWithAuth