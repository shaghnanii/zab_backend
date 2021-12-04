const validator = require('../../helpers/validate');

const sample_request = (req, res, next) => {
    const validationRule = {
        "validation_name": "required|min:5|max:5",
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
    sample_request
}