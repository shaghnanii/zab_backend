const models = require( '../../../server/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class ProfileController {
    async profile(req, res) {
        try {
            let user = await models.User.findByPk(req.user.id, {include: ['Role']});
            if (user){
                res.json({data: user})
            }
            else {
                res.status(404).json({message: "No user found.", data: null})
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }

    async complete_profile(req, res){
        try {
            if(!(req.user.id))
                res.status(404).json({message: "No auth user found"});
            let user = await models.User.findByPk(req.user.id, {include: ['Role']});
            if (user){
                const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
                let password = bcrypt.hashSync(req.body.new_password, salt);
                let update_details = user.update({
                    password: password,
                    password_status: 1,
                    department_id: req.body.department_id && req.body.department_id
                });
                user.reload();
                if (update_details){
                    res.json({message: 'User details updated successfully.', data: user})
                }
                else {
                    res.status(404).json({message: "Failed to update user details.", data: null})
                }
            }
            else {
                res.status(404).json({message: 'No logged in user. Please login to continue.'})
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = ProfileController;