module.exports = (req,res,next)=>{
    if(req.session.forgotPassword){
        next();
    }
    else{
        res.json("please generate otp fot verification").status(400);
    }
}