module.exports = (req,res,next)=>{
    if(req.session.isSupplier){
        next();
    }
    else{
        res.json("Please login as a supplier").status(302);
    }
}