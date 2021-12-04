module.exports = function (req, res, next){
    if (req.user.Role.name === 'pm'){
        next();
    }
    else {
        res.status(403).json({
            message: "Un-authorized (PM routes), Sorry you cannot access these routes."
        })
    }
}