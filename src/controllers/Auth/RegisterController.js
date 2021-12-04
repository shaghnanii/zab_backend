const models = require( '../../../server/models/index');
const bcrypt = require('bcrypt');

class RegisterController {
    register_user(req, res) {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.password_status = 0;
        req.body.is_active = 0;
        if (req.body.role_type === 'student'){
            req.body.role_id = 4;
        }
        else if (req.body.role_type === 'supervisor'){
            req.body.role_id = 3;
        }
        else if (req.body.role_type === 'pm'){
            req.body.role_id = 2;
        }
        models.User.create(req.body)
            .then(success => {
                if (success)
                    return res.status(201).json({
                        message: 'User created successfully.',
                        data: success
                    })
                else
                    return res.status(404).json({
                        message: 'Failed to create new user.',
                    })
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
    }
}

module.exports = RegisterController;