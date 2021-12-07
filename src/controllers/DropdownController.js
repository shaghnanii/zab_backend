const models = require( '../../server/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


class DropdownController {
    async dropdown_data(req, res){
        try {
            let campuses = await models.Campus.findAll();
            let departments = await models.Department.findAll();
            res.json({
                message: "Dropdown data",
                data: {
                    campuses: campuses,
                    departments: departments
                }
            })
        }
        catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async dropdown_departments(req, res){
        try {
            let departments = await models.Department.findAll({where: {campus_id: req.body.campus_id}});
            if (departments.length > 0){
                res.json({
                    message: "Departments dropdown data",
                    data: departments
                })
            }
            else {
                res.status(404).json({message: "No department found with the provided id."})
            }

        }
        catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}
module.exports = DropdownController;