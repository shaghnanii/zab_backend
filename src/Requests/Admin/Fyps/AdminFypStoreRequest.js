const validator = require('../../../helpers/validate');

const type_values = "web,android,ios,web-mobile,ios-android,machine-learning,unity,game"
const admin_add_fyp = (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:6",
        "type": "required|string|in:" + type_values,
        // "level": "required|string|in:1,2",
        "desc": "required|min:10",
        "department_id": "required"
    }
    const validationMessages = {
        'in.type': 'The selected :attribute is invalid. It must be one of the following. [' + type_values + ']'
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
    admin_add_fyp
}