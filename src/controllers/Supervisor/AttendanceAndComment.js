const models = require( '../../../server/models/index');
const bcrypt = require("bcrypt");
const {check} = require("express-validator");
const {Sequelize} = require("sequelize");

class AttendanceAndComment {
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
                        },
                        include: [{
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
                            {
                                model: models.Student,
                                as: 'Students',
                                include: {
                                    model: models.User,
                                    as: 'User'
                                }
                            },]
                    }
                }
            });
            if (fyps) {
                res.json({message: "Fyp attendances data", data: fyps})
            } else {
                res.status(404).json({message: "No fyp attendances found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async store(req, res){
        try {
            var today = new Date();
            var m_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.log('dateeeeeeeeeeeeeeeeeeeeeee: ', m_date)

            const Op = Sequelize.Op;
            const TODAY_START = new Date().setHours(0, 0, 0);
            const NOW = new Date();

            req.body.date = m_date;
            // let check_attendance = await models.Attendance.findAll(
            //     {
            //         where: {
            //             date: {
            //                 [Op.gt]: TODAY_START,
            //                 // [Op.lt]: NOW
            //             },
            //             fyp_id: req.body.fyp_id,
            //             level: req.body.level,
            //         }
            //     });
            // console.log(check_attendance)
            // if (!check_attendance){
                let attendance = await models.Attendance.create(req.body);
                req.body.attendance_id = attendance.id;
                let comment = await models.Comment.create(req.body)
                if (attendance) {
                    //data found
                    res.json({message: "Attendance successfully created", data: attendance})
                } else {
                    res.status(404).json({message: "Failed to create attendance"})
                }
            // }
            // else {
            //     res.status(409).json({message: 'Attendance already marked for today'})
            // }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = AttendanceAndComment;