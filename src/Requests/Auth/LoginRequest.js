const validator = require('../../helpers/validate');

const login_request = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6|max:50",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    message: 'Validation Error Occurs',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    login_request
}