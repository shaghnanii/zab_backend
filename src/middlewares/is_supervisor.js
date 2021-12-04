module.exports = function (req, res, next){
    if (req.user.Role.name === 'supervisor'){
        next();
    }
    else {
        res.status(403).json({
            message: "Un-authorized (Supervisor routes), Sorry you cannot access these routes."
        })
    }
}