const models = require( '../../../server/models/index');
class ProposalController {
    async index(req, res) {
        try {

        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    async show(req, res) {

    }

    async store(req, res) {

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}
module.exports = ProposalController;