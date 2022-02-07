const models = require( '../../../server/models/index');
const bcrypt = require("bcrypt");
const {forEach} = require("handlebars-helpers/lib/array");

class AcceptOrRejectProposal {
    async index(req, res){
        try {
            let proposals = await models.User.findByPk(req.user.id, {
                include: {
                    model: models.Supervisor,
                    as: 'Supervisor',
                    include: {
                        model: models.Group,
                        as: 'Groups',
                        where: {
                          status: 0
                        },
                        include: {
                            model: models.Fyp,
                            as: 'Fyp'
                        }
                    }
                }
            });
            if (proposals){
                res.json({message: 'Proposals retrieved successfully', data: proposals})
            }
            else {
                res.status(404).json({message: 'No proposals found.'})
            }
        }
        catch (error)
        {
            res.status(500).json({message: error.message})
        }
    }

    async store(req, res){
        try {
            if (req.body.type === 'reject'){
                let fyp = await models.Fyp.findByPk(req.body.fyp_id);
                if (fyp){
                    // fyp.update({status: 2});
                    let group = await models.Group.findByPk(req.body.group_id);
                    if (group){
                        group.update({status: 2, supervisor_id: null})
                        let student = await models.Student.findAll({where: {group_id: req.body.group_id}});
                        student.forEach(std => {
                            std.update({group_id: null})
                        })
                        if (student) {
                            //data found
                            res.json({message: "Supervision Request Rejected Successfully", data: student})
                        } else {
                            res.status(404).json({message: "Failed to reject supervision request"})
                        }
                    }
                    else {
                        res.status(404).json({message: 'Failed to find group details against the provided id.'})
                    }
                }
                else {
                    res.status(404).json({message: 'Failed to find fyp details against the provided id.'})
                }
            }
            else {
                let fyp = await models.Fyp.findByPk(req.body.fyp_id);
                fyp.update({status: 1})
                let group = await models.Group.findByPk(req.body.group_id);
                group.update({status: 1})
                if (group) {
                    //data found
                    res.json({message: "Supervision Request Accepted Successfully", data: group})
                } else {
                    res.status(404).json({message: "Failed to accept supervision request"})
                }
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = AcceptOrRejectProposal;