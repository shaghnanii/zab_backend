const validator = require('../../helpers/validate');

const reset_password = (req, res, next) => {
    const validationRule = {
        "code": "required|min:5|max:5",
        "new_password": "required|min:6|max:50|confirmed",
        "new_password_confirmation": "required|min:6|max:50",
        "email": "required|email"
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
    reset_password
}