const models = require( '../../../../server/models/index');
const bcrypt = require("bcrypt");

class StudentController {
    index(req, res){
        models.Student.findAll({ include: models.User })
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                res.json('here catch')
            })

    }
    show(req, res) {
        res.status(200).json({"message": 'show with id ' + req.params.id});
    }
    store(req, res){
        const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        req.body.password_status = 0;
        req.body.is_active = 0;
        req.body.role_id = 4; // student id = 4

        req.body.student = {
            name: req.body.name,
            phone_number: req.body.phone_number,
        }
        models.User.create(req.body,{ include: models.Student })
            .then(success => {
                if (success){
                    return res.status(201).json({
                        message: 'User created successfully.',
                        data: success
                    })
                }
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
    update(req, res){
        res.status(200).json({"message": 'update with id: ' + req.params.id });
    }
    delete(req, res){
        res.status(200).json({"message": 'delete with id: ' + req.params.id });
    }
}

module.exports = StudentController;