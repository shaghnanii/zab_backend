const models = require( '../../../../server/models/index');
const bcrypt = require("bcrypt");

class FypController {

    async index(req, res) {
        try {
            let fyps = await models.Fyp.findAll();
            if (fyps.length !== 0) {
                //data found
                res.json({message: "Fyp data", data: fyps})
            } else {
                res.status(404).json({message: "No Fyp found."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async show(req, res) {
        try {
            let fyp = await models.Fyp.findByPk(req.params.id);
            if (fyp) {
                //data found
                res.json({message: "Fyp data", data: fyp})
            } else {
                res.status(404).json({message: "No fyp found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async store(req, res) {
        try {
            req.body.status = 1;
            req.body.level = 1;
            // check for email existence in db
            let check_title = await models.Fyp.findAll({where: {name: req.body.name}})
            if(check_title.length > 0){
                res.status(409).json({message: "This fyp title is already taken, please use a different title."})
            }
            else {
                let fyp_data = await models.Fyp.create(req.body);

                if (fyp_data) {
                    res.status(200).json({message: 'Fyp created successfully.', data: fyp_data})
                } else {
                    res.status(409).json({message: 'Failed to create fyp details.'})
                }
            }
        } catch (err) {
            res.status(500).json({message: err})
        }
    }
    async update(req, res) {
        try {
            let fyp = await models.Fyp.findByPk(req.params.id);
            if(fyp) {
                let fyp_details = fyp.update(req.body);
                fyp.reload();
                res.json({message: "Fyp details updated successfully.", data: fyp})
            }
            else {
                res.status(404).json({ message: "No fyp found with the provided id."})
            }
        }
        catch (err){
            res.status(500).json({ message: err.message })
        }
    }
    async delete(req, res) {
        try {
            let fyp = await models.Fyp.findByPk(req.params.id);
            if (fyp) {
                fyp.destroy();
                res.json({ message: "Fyp deleted successfully." });
            } else {
                res.status(404).json({message: "No fyp found with the provided id."})
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = FypController;