const models = require( '../../../server/models/index');
const {check} = require("express-validator");

class PannelController {
    async index(req, res) {
        try {
            let groups = await models.Pannel.findAll(
                {
                    include: [
                        {
                            model: models.Supervisor,
                            as: 'Supervisors'
                        },
                        {
                            model: models.Group,
                            as: 'Groups'
                        },
                        {
                            model: models.Pm,
                            as: 'Pm'
                        }
                    ]
                }
                );

            if (groups){
                res.json({message: 'Pannel data', data: groups})
            }
            else {
                res.status(404).json({message: "No pannel data found."});
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async show(req, res) {

    }

    async store(req, res) {
        try {
            let pm = await models.User.findByPk(req.user.id, {include: {model: models.Pm, as: 'Pm'}})
            if (!pm){
                res.status(404).json({message: 'Failed to find pm details using the provided pm id.'})
            }
            else {
                let supervisor_ids = req.body.supervisors_id;
                let group_ids = req.body.groups_id;
                let check = await models.Supervisor.findAll({where: {id: supervisor_ids}})
                console.log('******************** data **************************************************** running...', check)
                if (check){
                    req.body.pm_id = pm.Pm.id
                    let group = await models.Pannel.create(req.body);
                    if (group) {
                        supervisor_ids.map(item => {
                            models.Supervisor.findByPk(item)
                                .then(response => {
                                    if (response){
                                        console.log("resp.............................. found",)
                                        let pan_data = {
                                            'pannel_id': group.id
                                        }
                                        response.update(pan_data)

                                        // res.status(200).json({message: 'Pm panel created successfully.', data: group})
                                    }
                                    else {
                                        // res.status(404).json({message: 'Failed to find some of the provided supervisors.'})
                                    }
                                })
                                .catch(err => {
                                    // res.status(500).json({message: err.message})
                                    console.log("resp..............................", err.message)
                                })
                        })
                        group_ids.map(gid => {
                            models.Group.findByPk(gid)
                                .then(resp => {
                                    if (resp){
                                        resp.update({'pannel_id': group.id})
                                    }
                                    else {
                                        // res.status(404).json({message: 'Some of the provided gorup doesnt found in the parent table.'})
                                    }
                                })
                                .catch(err => {
                                    // res.status(500).json({message: err.message})
                                })
                        })
                        res.status(200).json({message: 'Pm panel created successfully.', data: group})
                    } else {
                        res.status(409).json({message: 'Failed to create panel details.'})
                    }
                }
                else {
                    res.status(404).json({message: "There is no supervisor in the parent table with one of the provided supervisor id."})
                }
            }
        } catch (err) {
            res.status(500).json({message: err})
        }
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}
module.exports = PannelController;