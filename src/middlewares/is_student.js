module.exports = function (req, res, next){
    if (req.user.Role.name === 'student'){
        next();
    }
    else {
        res.status(403).json({
            message: "Un-authorized (Student routes), Sorry you cannot access these routes."
        })
    }
}