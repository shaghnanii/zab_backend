const validator = require('../../../helpers/validate');

const admin_add_student = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6",
        "reg_id": "required",
        // "role_type": "required|in:student",
        // "image": "required|image",
        "department_id": "required",
        "name": "required",
        "phone_number": "required",
        "address": "required",
        "batch": "required|in:2015,2016,2017,2018,2019,2020,2021,2022",
        "gender": "required",
        "dob": "required|date",
        "majors": "required|in:bscs,bsse,bsit",
    }
    const customMessages = {
        'in.batch': 'The :attribute in invalid, it must be one of the following [2015,2016,2017,2018,2019,2020,2021,2022]'
    }
    validator(req.body, validationRule, customMessages, (err, status) => {
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
    admin_add_student
}