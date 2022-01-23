const models = require( '../../../server/models/index');
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
        try {
            let group = await models.Pannel.create(req.body);
            if (group) {
                res.status(200).json({message: 'Pannel created successfully.', data: group})
            } else {
                res.status(409).json({message: 'Failed to create pannel details.'})
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