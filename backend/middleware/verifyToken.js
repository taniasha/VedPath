const jwt = require('jsonwebtoken');

 const verifyToken=(req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("Header:", req.headers.authorization);
    // used to extract the JWT token from the Authorization header
    //by convention   Authorization: Bearer <token>   is send like this
    // "Bearer" tells the server what kind of authentication is being used.
    if(!token) return res.status(400).json({msg:'Token missing'});
    
    try{
        const decoded = jwt.verify(token, 'JWT_SECRET') //verify the token and user payload(id, email,password) stores in decoded
        req.user = decoded; // stores decoded user info in req.user
        next(); // move to next middleware otherwise it will neverf inish and hang in there

    }catch(err){
        res.status(403).json({msg:'Invalid Token'})
    }
}
module.exports = verifyToken;
