const models = require( '../../../server/models/index');
class GroupController {
    async index(req, res) {
        try {
            let groups = await models.Student.findOne(
                {
                    where: {user_id: req.user.id},
                    include: {
                        model: models.Group,
                        as: 'Group'
                    }
                });

            if (groups){
                res.json({message: 'Group data', data: groups})
            }
            else {
                res.status(404).json({message: "No group data found."});
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async show(req, res) {

    }

    async store(req, res) {
        try {
            let group = await models.Group.create(req.body);
            if (group) {
                if (req.user.id == req.body.partner_id){
                    res.status(404).json({message: "Partner id and current user id cannot be equal."})
                }
                else {
                    let student = await models.Student.findOne({where: {user_id: req.body.partner_id}});
                    if (student){
                        student.update({group_id: group.id});
                        let student2 = await models.Student.findOne({where: {user_id: req.user.id}});
                        student2.update({group_id: group.id});
                        res.status(200).json({message: 'Group created successfully.', data: group})
                    }
                    else{
                        res.status(404).json({message: "No partner found with the provided partner id."})
                    }
                }
            } else {
                res.status(409).json({message: 'Failed to create fyp details.'})
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
module.exports = GroupController;