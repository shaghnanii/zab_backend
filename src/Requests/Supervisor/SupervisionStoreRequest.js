const validator = require('../../helpers/validate');

const type_values = "accept,reject";
const create_accept_supervision_request = (req, res, next) => {
    const validationRule = {
        "type": "required|in:" + type_values,
        "fyp_id": "required",
        "group_id": "required"
    }
    const validationMessages = {
        'in.type': 'The selected :attribute is invalid. It must be one of the following. [' + type_values + ']',
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
    create_accept_supervision_request
}