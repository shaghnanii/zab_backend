const models = require( '../../../server/models/index');
const bcrypt = require("bcrypt");

class PmController {
    async index(req, res){
        try {
            let pm = await models.Pm.findOne(
                {
                    where: {
                        user_id: req.user.id,
                    },
                    include: {
                        model: models.User,
                        as: 'User',
                        include: {
                            model: models.Department
                        }
                    }
                });
            if (pm) {
                //data found
                res.json({message: "PM data", data: pm})
            } else {
                res.status(404).json({message: "No pm found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = PmController;