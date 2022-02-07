const validator = require('../../helpers/validate');

const status_values = "Absent,Present,Leave";
const level_values = "1,2";
const create_attendance_request = (req, res, next) => {
    const validationRule = {
        "fyp_id": "required",
        "status": "required|in:" + status_values,
        "level": "required|in:" + level_values,
        "comment": "required",
    }
    const validationMessages = {
        'in.status': 'The selected :attribute is invalid. It must be one of the following. [' + status_values + ']',
        'in.level': 'The selected :attribute is invalid. It must be one of the following. [' + level_values + ']'
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
    create_attendance_request
}