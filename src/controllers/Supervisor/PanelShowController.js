const models = require( '../../../server/models/index');
const bcrypt = require("bcrypt");

class PanelShowController {
    async index(req, res){
        try {
            let panels = await models.User.findByPk(req.user.id, {
                include: {
                    model: models.Supervisor,
                    as: 'Supervisor',
                    include: {
                        model: models.Pannel,
                        as: 'Pannel',
                        include: {
                            model: models.Group,
                            as: 'Groups',
                            where: {
                                status: '1'
                            },
                            include: [
                                {
                                    model: models.Fyp,
                                },
                                {
                                    model: models.Student,
                                    include: {
                                        model: models.User,
                                    }
                                },
                                {
                                    model: models.Assessment
                                }
                            ]
                        }
                    }
                }
            });
            if (panels) {
                res.json({message: "Panel data", data: panels})
            } else {
                res.status(404).json({message: "No pannel found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = PanelShowController;