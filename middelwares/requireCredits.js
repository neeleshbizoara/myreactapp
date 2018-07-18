//next : is called wen our middleware completes or done 
module.exports = (req, res, next) => {
    if(req.user.credits < 1){
        return res.status(403).send({error: `You are runnig out of credits. Please add Credits.`})
    }

    next();
}