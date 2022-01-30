const models = require( '../../../server/models/index');

class StudentComment {
    async index(req, res){
        try {
            let comments = await models.User.findByPk(req.user.id, {
                include: {
                    model: models.Student,
                    as: 'Student',
                    include: {
                        model: models.Group,
                        as: 'Group',
                        include:
                            {
                                model: models.Fyp,
                                as: 'Fyp',
                                include: {
                                    model: models.Attendance,
                                    as: 'Attendances',
                                    include: {
                                        model: models.Comment,
                                        as: 'Comment'
                                    }
                                }
                            },
                    }
                }
            });
            if (comments) {
                res.json({message: "Comments data", data: comments})
            } else {
                res.status(404).json({message: "No comments found"})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = StudentComment;