const models = require( '../../../server/models/index');
const bcrypt = require("bcrypt");

class FypListController {
    async index(req, res){
        try {
            let fyps = await models.User.findByPk(req.user.id, {
                include: {
                    model: models.Supervisor,
                    as: 'Supervisor',
                    include: {
                        model: models.Group,
                        as: 'Groups',
                        where: {
                            level: req.query.level,
                            status: 1,
                        },
                        include: {
                            model: models.Fyp,
                            as: 'Fyp',
                        }
                    }
                }
            });
            if (fyps) {
                res.json({message: "Fyps data", data: fyps})
            } else {
                res.status(404).json({message: "No fyps found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async show(req, res){
        try {
            let supervisor = await models.Supervisor.findOne(
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
            if (supervisor) {
                //data found
                res.json({message: "Supervisor data", data: supervisor})
            } else {
                res.status(404).json({message: "No supervisor found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = FypListController;