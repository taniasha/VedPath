const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

 const verifyToken=(req, res, next)=>{ 
     try{
        const token = req.headers.authorization?.split(' ')[1]; 
        console.log("Header:", req.headers.authorization);
        // used to extract the JWT token from the Authorization header
        //by convention   Authorization: Bearer <token>   is send like this
        // "Bearer" tells the server what kind of authentication is being used.
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //verify the token and user payload(id, email,password) stores in decoded
        req.user = decoded;                             // stores decoded user info in req.user
        next();                                         // move to next middleware otherwise it will neverf inish and hang in there

    }catch(err){
        res.status(403).json({msg:'Invalid Token'})
         console.error("❌ Invalid Token:", err.message);
    }
}

module.exports = verifyToken;
