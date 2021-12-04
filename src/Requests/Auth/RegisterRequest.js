const validator = require('../../helpers/validate');

const register_request = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6",
        // "password_confirmation": "required|string|min:6|max:50",
        "reg_id": "required",
        "role_type": "required|in:student,supervisor,pm",
        "department_id": "required"
    }
    const validationMessages = {
        'in.role_type': "Invalid value. The :attribute must be one of the following. [ student | supervisor | pm ]"
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
    register_request
}