const validator = require('../../helpers/validate');
const type_values = "web,android,ios,web-mobile,ios-android,machine-learning,unity,game"

const pm_create_pannel_request = (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:4",
        "supervisors_id": "required|array",
        "groups_id": "required|array",
    }
    const validationMessages = {

    }
    validator(req.body, validationRule, validationMessages, (err, status) => {
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
    pm_create_pannel_request
}