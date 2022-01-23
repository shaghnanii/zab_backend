const validator = require('../../../helpers/validate');

const type_values = "web,android,ios,web-mobile,ios-android,machine-learning,unity,game"
const student_create_group_request = (req, res, next) => {
    const validationRule = {
        "name": "required|string|min:3",
        "supervisor_id": "required",
        // "pannel_id": "required",
        "fyp_id": "required",
        "partner_id": "required"
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
    student_create_group_request
}