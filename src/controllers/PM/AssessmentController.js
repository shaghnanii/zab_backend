const models = require( '../../../server/models/index');
class AssessmentController {
    async index(req, res) {
        try {
            let assessments = null;
            if (req.user.Role.name === 'student'){
                assessments = await models.User.findByPk(req.user.id, {
                    include: {
                        model: models.Student,
                        as: "Student",
                        include: {
                            model: models.Group,
                            as: "Group",
                            include: {
                                model: models.Assessment,
                                as: 'Assessments'
                            }
                        }
                    }
                });
            }
            else if(req.user.Role.name === 'pm'){
                assessments = await models.User.findAll( {
                    where: {
                        role_id: 4,
                    },
                    include: {
                        model: models.Student,
                        as: "Student",
                        include: {
                            model: models.Group,
                            as: "Group",
                            include: {
                                model: models.Assessment,
                                as: 'Assessments'
                            }
                        }
                    }
                });
            }
            else if(req.user.Role.name === 'supervisor'){
                assessments = await models.User.findAll( {
                    where: {
                        role_id: 4,
                    },
                    include: {
                        model: models.Student,
                        as: "Student",
                        include: {
                            model: models.Group,
                            as: "Group",
                            include: {
                                model: models.Assessment,
                                as: 'Assessments'
                            }
                        }
                    }
                });
            }
            else {
                assessments = await models.User.findAll( {
                    where: {
                        role_id: 4,
                    },
                    include: {
                        model: models.Student,
                        as: "Student",
                        include: {
                            model: models.Group,
                            as: "Group",
                            include: {
                                model: models.Assessment,
                                as: 'Assessments'
                            }
                        }
                    }
                });
            }
            if (assessments){
                res.json({message: 'Assessments retrieved successfully', data: assessments})
            }
            else {
                res.status(404).json({message: "No assessment found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async show(req, res) {

    }

    async store(req, res) {
        try {
            let group = await models.Group.findByPk(req.body.group_id);
            if (!group){
                res.status(404).json({message: 'The provided group id is invalid, it doesn\'t exists in the parent table. If there is no group please create a group first.'})
            }
            else {
                if (req.body.total_mark > 100 || req.body.total_mark < 0 || req.body.obtained_mark > 100 || req.body.obtained_mark < 0){
                    res.status(409).json({message: "Please provide a valid marks, you cannot provide marks below 0 or above 100."})
                }
                else {
                    req.body.level = 1;
                    let user = await models.User.findByPk(req.user.id, {include: {model: models.Pm, as: 'Pm'}});
                    if (!user){
                        res.status(404).json({message: 'Failed to find the pm details associated with the logged in user.'})
                    }
                    else {
                        req.body.pm_id = user.Pm.id
                        let assessment = await models.Assessment.create(req.body);
                        if (assessment) {
                            res.status(200).json({message: 'Assessment created successfully.', data: assessment})
                        } else {
                            res.status(409).json({message: 'Failed to create Assessment.'})
                        }
                    }
                }
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}
module.exports = AssessmentController;