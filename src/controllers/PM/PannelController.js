const models = require( '../../../server/models/index');
const {check} = require("express-validator");

class PannelController {
    async index(req, res) {
        try {
            let groups = await models.Pannel.findOne(
                // {
                //     include: {
                //         model: models.Example,
                //         as: 'Exmaple'
                //     }
                // }
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
        async function check_sup(item) {
            return await models.Supervisor.findByPk(item)
        }

        try {
            let pm = await models.User.findByPk(req.user.id, {include: {model: models.Pm, as: 'Pm'}})
            if (!pm){
                res.status(404).json({message: 'Failed to find pm details using the provided pm id.'})
            }
            else {
                let supervisor_ids = req.body.supervisors_id;
                let check = true;
                supervisor_ids.forEach(item => {
                    let check_supervisor = check_sup(item);
                    if (!check_supervisor){
                        res.status(404).json({message: "There is no supervisor in the parent table with one of the provided supervisor id."})
                        check = false;
                    }
                })
                if (check){
                    req.body.pm_id = pm.Pm.id
                    let group = await models.Pannel.create(req.body);
                    if (group) {
                        res.status(200).json({message: 'Pm panel created successfully.', data: group})
                    } else {
                        res.status(409).json({message: 'Failed to create panel details.'})
                    }
                }
                else {
                    res.status(404).json({messageeeeeeeee: "There is no supervisor in the parent table with one of the provided supervisor id."})
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