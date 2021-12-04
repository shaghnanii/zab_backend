const validator = require('../../helpers/validate');

const forgot_password = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
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
    forgot_password
}