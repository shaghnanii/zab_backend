module.exports = function (req, res, next){
    if (req.user.Role.name === 'admin'){
        next();
    }
    else {
        res.status(403).json({
            message: "Un-authorized (Admin routes), Sorry you cannot access these routes."
        })
    }
}