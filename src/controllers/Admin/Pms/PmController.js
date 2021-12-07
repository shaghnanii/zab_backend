const models = require( '../../../../server/models/index');
const bcrypt = require("bcrypt");

class PmController {

    async index(req, res) {
        try {
            let pms = await models.Pm.findAll({include: ['User']});
            if (pms.length !== 0) {
                //data found
                res.json({message: "User data", data: pms})
            } else {
                res.status(404).json({message: "No PM found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async show(req, res) {
        try {
            let pm = await models.Pm.findByPk(req.params.id, {include: ['User']});
            if (pm) {
                //data found
                res.json({message: "User data", data: pm})
            } else {
                res.status(404).json({message: "No pm found with the provided id."})
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
            req.body.role_id = 2; // pm id = 2
            req.body.Pm = req.body;
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
                            model: models.Pm,
                            as: 'Pm'
                        }]
                    });
                if (user_data) {
                    res.status(200).json({message: 'User created successfully.', data: user_data})
                } else {
                    res.status(409).json({message: 'Failed to create new user.'})
                }
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async update(req, res) {
        try {
            let pm = await models.Pm.findByPk(req.params.id, { include: ['User']});
            if(pm) {
                // const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
                // req.body.password = bcrypt.hashSync(req.body.password, salt)
                req.body.Pm = req.body;
                // req.body.Pm = {
                //     email: req.body.email,
                //     reg_id: req.body.reg_id,
                //     password_status: 1,
                //     is_active: 1,
                //     role_id: 1,
                //     department_id: 1
                // }
                req.body.User = req.body
                // console.log("user detqails: ", req.body)
                let user = pm.update(
                    req.body,
                    {
                        include: [{
                            model: models.Pm,
                            as: 'Pm'
                        }]
                    }
                );
                // pm.save();
                pm.reload();
                res.json({message: "User details updated successfully.", data: pm})
            }
            else {
                res.status(404).json({ message: "No pm found with the provided id."})
            }
        }
        catch (err){
            res.status(500).json({ message: err.message })
        }
    }
    async delete(req, res) {
        try {
            let pm = await models.Pm.findByPk(req.params.id, {include: ['User']});
            if (pm) {
                let user = await models.User.findByPk(pm.User.id);
                user.destroy();
                res.json({ message: "User deleted successfully." });
            } else {
                res.status(404).json({message: "No pm found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = PmController;