const validator = require('../../../helpers/validate');

const admin_add_supervisor = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6",
        "reg_id": "required",
        // "role_type": "required|in:supervisor",
        // "image": "required|image",
        "department_id": "required",
        "name": "required",
        "phone_number": "required",
        "address": "required",
        "gender": "required",
        "dob": "required|date",
        "majors": "required|in:bscs,bsse,bsit",
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
    admin_add_supervisor
}