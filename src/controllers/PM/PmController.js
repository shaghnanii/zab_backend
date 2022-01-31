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

    async fyp_one(req, res) {
        try {
            let fyp_one_lists = await models.Group.findAll(
                {
                    where: {
                        status: true,
                        level: 1
                    },
                    include: [
                        {
                            model: models.Fyp,
                            as: 'Fyp',
                        },
                        {
                            model: models.Supervisor,
                            as: 'Supervisor',
                        },
                        {
                            model: models.Student,
                            as: 'Students',
                            include: {
                                model: models.User,
                                as: 'User'
                            }
                        }
                    ]
                });
            if (fyp_one_lists){
                res.json({message: 'fyp one listing.', data: fyp_one_lists})
            }
            else {
                res.status(404).json({message: 'No fyp one listing found'});
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }
    async fyp_two(req, res) {
        try {
            let fyp_one_lists = await models.Group.findAll(
                {
                    where: {
                        status: true,
                        level: 2
                    },
                    include: [
                        {
                            model: models.Fyp,
                            as: 'Fyp',
                        },
                        {
                            model: models.Supervisor,
                            as: 'Supervisor',
                        },
                        {
                            model: models.Student,
                            as: 'Students',
                        }
                    ]
                });
            if (fyp_one_lists){
                res.json({message: 'fyp one listing.', data: fyp_one_lists})
            }
            else {
                res.status(404).json({message: 'No fyp one listing found'});
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }

    async one_comments(req, res){
        try {
            let comments = await models.Group.findAll(
                {
                    where: {
                        status: true,
                        level: 1
                    },
                    include: [
                        {
                            model: models.Fyp,
                            as: "Fyp",
                            include: {
                                model: models.Attendance,
                                as: 'Attendances',
                                include: {
                                    model: models.Comment,
                                    as: 'Comment'
                                }
                            }
                        },
                        {
                            model: models.Student,
                            as: 'Students',
                            include: {
                                model: models.User,
                                as: 'User'
                            }
                        }

                    ]
                }
            )
            if (comments){
                res.json({message: 'retrieved comments successfully', data: comments})
            }
            else {
                res.status(404).json({message: 'Failed to retrieved comments and meetings data.'})
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }
    async two_comments(req, res){
        try {
            let comments = await models.Group.findAll(
                {
                    where: {
                        status: true,
                        level: 2
                    },
                    include: [
                        {
                            model: models.Fyp,
                            as: "Fyp",
                            include: {
                                model: models.Attendance,
                                as: 'Attendances',
                                include: {
                                    model: models.Comment,
                                    as: 'Comment'
                                }
                            }
                        },
                        {
                            model: models.Student,
                            as: 'Students',
                            include: {
                                model: models.User,
                                as: 'User'
                            }
                        }
                    ]
                }
            )
            if (comments){
                res.json({message: 'retrieved comments successfully', data: comments})
            }
            else {
                res.status(404).json({message: 'Failed to retrieved comments and meetings data.'})
            }
        }
        catch (err){
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = PmController;