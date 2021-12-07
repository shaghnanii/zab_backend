require('dotenv').config()
const models = require( '../../../server/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const passport = require('passport');

class LoginController {
    login_user(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        models.User.findOne(
            {
                where: {email: email},
                include: models.Role
            }
        )
            .then(user => {
                if (!user)
                    return res.status(404).json({
                        message: 'No user found with the provided email.'
                    });
                const isValidPassword = bcrypt.compareSync(password, user.password);
                // console.log(user)
                if (isValidPassword){
                    // expiresIn: '10m' [in option provide this to make the token expire in 10 minutes]
                    const access_token = jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SCRET)
                    return res.json({
                        access_token: access_token,
                        data: user
                    })
                }
                else {
                    return res.status(403).json({
                        message: 'Invalid password!. Please make sure you are using the correct password to login.'
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    message: err.message
                });
            });
    }
}

module.exports = LoginController;