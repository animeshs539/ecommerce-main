module.exports = (req,res,next)=>{
    if(req.session.isUser){
        console.log(req.session.isLoggedIn);
        next();
    }
    else{
        res.json("Please login").status(200);
    }
}