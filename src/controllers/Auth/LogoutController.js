const models = require( '../../../server/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class LogoutController {
    logout(req, res) {
        res.status(200).json({message: "Successfully logout."})
    }
}

module.exports = LogoutController;