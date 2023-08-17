module.exports = (req,res,next)=>{
    if(req.session.forgotPasswordSupplier){
        next();
    }else{
        res.json("please generate otp for verification").status(400);
    }
}