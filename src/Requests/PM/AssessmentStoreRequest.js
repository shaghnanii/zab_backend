const validator = require('../../helpers/validate');
const type_values = "web,android,ios,web-mobile,ios-android,machine-learning,unity,game"

const pm_create_assessment_request = (req, res, next) => {
    const validationRule = {
        "question": "required|string|min:20",
        "total_mark": "required",
        "obtained_mark": "required",
        "group_id": "required|numeric",
        // "supervisor_id": "required|numeric"
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
    pm_create_assessment_request
}