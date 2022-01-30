const models = require( '../../../server/models/index');
class ResultController {

    async index(req, res) {
        try {
            let results = await models.User.findByPk(req.user.id,
                {
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
                                        model: models.Result,
                                        as: 'Results'
                                    }
                                },
                        }
                    }
                }
            )

            if (results){
                let total_marks = 0;
                let total_obtained_marks = 0;
                results.Student.Group.Fyp.Results.map(item => {
                    total_obtained_marks = total_obtained_marks + item.marks;
                    total_marks = total_marks + item.total;
                })
                let percentage = (total_obtained_marks / total_marks) * 100;
                res.json(
                    {
                        message: 'Result data',
                        data: results,
                        total: total_marks,
                        marks: total_obtained_marks,
                        percentage: percentage,
                    })
            }
            else {
                res.status(404).json({message: "No result data found."});
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

}
module.exports = ResultController;