function restricted(req, res, next) {
    if(req.session && req.session.user){
        next();
    }else{
        res.status(401).json({message: 'Not authorized for this endpoint.'});
    }
}

module.exports = restricted