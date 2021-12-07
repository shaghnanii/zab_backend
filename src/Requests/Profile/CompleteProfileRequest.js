const validator = require('../../helpers/validate');

const complete_profile_request = (req, res, next) => {
    const validationRule = {
        "new_password": "required|string|min:6|confirmed",
        "new_password_confirmation": "required|string|min:6"
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
    complete_profile_request
}