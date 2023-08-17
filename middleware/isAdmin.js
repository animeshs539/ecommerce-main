module.exports = (req,res,next)=>{
    if(req.session.isAdmin){
        next();
    }
    else{
        res.json("Please login as a admin").status(302);
    }
}