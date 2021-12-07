const models = require( '../../../../server/models/index');
const bcrypt = require("bcrypt");

class SupervisorController {

    async index(req, res) {
        try {
            let supervisors = await models.Supervisor.findAll({include: ['User']});
            if (supervisors.length !== 0) {
                //data found
                res.json({message: "User data", data: supervisors})
            } else {
                res.status(404).json({message: "No supervisor found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async show(req, res) {
        try {
            let supervisor = await models.Supervisor.findByPk(req.params.id, {include: ['User']});
            if (supervisor) {
                //data found
                res.json({message: "User data", data: supervisor})
            } else {
                res.status(404).json({message: "No supervisor found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async store(req, res) {
        try {
            const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            req.body.password_status = 0;
            req.body.is_active = 1;
            req.body.role_id = 3; // supervisor id = 3
            req.body.Supervisor = req.body;
            // check for email existence in db
            let check_email = await models.User.findAll({where: {email: req.body.email}})
            // check for registration id existence in db
            let reg_id_check = await models.User.findAll({where: {reg_id: req.body.reg_id}});

            if(check_email.length > 0 || reg_id_check.length > 0){
                res.status(409).json({message: "This email or registration id is already taken, please use a different email or registration id."})
            }
            else {
                let user_data = await models.User.create(
                    req.body,
                    {
                        include: [{
                            model: models.Supervisor,
                            as: 'Supervisor'
                        }]
                    });
                if (user_data) {
                    res.status(200).json({message: 'User created successfully.', data: user_data})
                } else {
                    res.status(409).json({message: 'Failed to create new user.'})
                }
            }
        } catch (err) {
            res.status(500).json({message: err})
        }
    }
    async update(req, res) {
        try {
            let supervisor = await models.Supervisor.findByPk(req.params.id, { include: ['User']});
            if(supervisor) {
                // const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
                // req.body.password = bcrypt.hashSync(req.body.password, salt)
                req.body.User = req.body;
                // req.body.User = {
                //     email: req.body.email,
                //     reg_id: req.body.reg_id,
                //     password_status: 1,
                //     is_active: 1,
                //     role_id: 3,
                //     department_id: 1
                // }
                req.body.User = req.body
                // console.log("user request details: ", req.body)
                let user = supervisor.update(
                    req.body,
                    {
                        include: [{
                            model: models.User,
                            as: 'User'
                        }]
                    }
                );
                // supervisor.save();
                supervisor.reload();
                res.json({message: "User details updated successfully.", data: supervisor})
            }
            else {
                res.status(404).json({ message: "No supervisor found with the provided id."})
            }
        }
        catch (err){
            res.status(500).json({ message: err.message })
        }
    }
    async delete(req, res) {
        try {
            let supervisor = await models.Supervisor.findByPk(req.params.id, {include: ['User']});
            if (supervisor) {
                let user = await models.User.findByPk(supervisor.User.id);
                user.destroy();
                res.json({ message: "User deleted successfully." });
            } else {
                res.status(404).json({message: "No supervisor found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = SupervisorController;