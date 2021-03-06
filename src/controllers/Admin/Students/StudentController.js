const models = require( '../../../../server/models/index');
const bcrypt = require("bcrypt");

class StudentController {

    async index(req, res) {
        try {
            let student = await models.Student.findAll({include: ['User']});
            if (student.length !== 0) {
                //data found
                res.json({message: "User data", data: student})
            } else {
                res.status(404).json({message: "No student found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async show(req, res) {
        try {
            let student = await models.Student.findByPk(req.params.id, {include: ['User']});
            if (student) {
                //data found
                res.json({message: "User data", data: student})
            } else {
                res.status(404).json({message: "No student found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async store(req, res) {
        let transaction;
        try {
            const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            req.body.password_status = 0;
            req.body.is_active = 1;
            req.body.role_id = 4; // student id = 4
            req.body.Student = req.body;
            // check for email existence in db
            let check_email = await models.User.findAll({where: {email: req.body.email}})
            // check for registration id existence in db
            let reg_id_check = await models.User.findAll({where: {reg_id: req.body.reg_id}});

            if(check_email.length > 0 || reg_id_check.length > 0){
                res.status(409).json({message: "This email or registration id is already taken, please use a different email or registration id."})
            }
            else {
                // transaction = await sequelize.transaction();
                let user_data = await models.User.create(
                    req.body,
                    {
                        include: [{
                            model: models.Student,
                            as: 'Student'
                        }]
                    });
                if (user_data) {
                    // await transaction.commit();
                    res.status(200).json({message: 'User created successfully.', data: user_data})
                } else {
                    // await transaction.rollback();
                    res.status(409).json({message: 'Failed to create new user.'})
                }
            }
        } catch (err) {
            // if (transaction) await transaction.rollback();
            res.status(500).json({message: err.message})
        }
    }
    async update(req, res) {
        try {
            let student = await models.Student.findByPk(req.params.id, { include: ['User']});
            if(student) {
                // const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
                // req.body.password = bcrypt.hashSync(req.body.password, salt)
                req.body.User = req.body;
                // req.body.User = {
                //     email: req.body.email,
                //     reg_id: req.body.reg_id,
                //     password_status: 1,
                //     is_active: 1,
                //     role_id: 1,
                //     department_id: 1
                // }
                req.body.User = req.body
                // console.log("user detqails: ", req.body)
                let user = student.update(
                    req.body,
                    {
                        include: [{
                            model: models.User,
                            as: 'User'
                        }]
                    }
                );
                // student.save();
                student.reload();
                res.json({message: "User details updated successfully.", data: student})
            }
            else {
                res.status(404).json({ message: "No student found with the provided id."})
            }
        }
        catch (err){
            res.status(500).json({ message: err.message })
        }
    }
    async delete(req, res) {
        try {
            let student = await models.Student.findByPk(req.params.id, {include: ['User']});
            if (student) {
                let user = await models.User.findByPk(student.User.id);
                user.destroy();
                res.json({ message: "User deleted successfully." });
            } else {
                res.status(404).json({message: "No student found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = StudentController;