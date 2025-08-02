const verifyAdmin=(req, res , next)=>{
    const adminEmail = 'vedpath@gmail.com';
 console.log("🔒 Admin Check:", req.user);

    if(req.user?.email === adminEmail){
        return next();
    }else{
        res.status(403).json({msg:'AdminsOnly'})
    }
}

module.exports = verifyAdmin;