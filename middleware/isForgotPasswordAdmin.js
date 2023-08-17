module.exports = (req,res,next)=>{
    if(req.session.forgotPasswordAdmin){
        next();
    }else{
        res.json("please generate otp for verification").status(400);
    }
}