const models = require( '../../../server/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

class ForgotPasswordController {
    send_email(req, res) {
        models.User.findOne({where: {email: req.body.email}}, {
            include: [
                {
                    model: models.Role,
                    attributes: ['id', 'name']
                }
            ],
            attributes: ['id', 'name']
        })
            .then(data => {
                if (data){
                    //send email to the user
                    // const from_email = process.env.ACCESS_TOKEN_SCRET;
                    const transporter = nodemailer.createTransport({
                        service: process.env.MAIL_SERVICE,
                        host: process.env.MAIL_HOST,
                        port: process.env.MAIL_PORT,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: process.env.MAIL_ADDRESS,
                            pass: process.env.MAIL_PASSWORD,
                        },
                    });

                    const random_code = Math.floor(Math.random() * (99999 - 23421) + 23421);
                    const mailOptions = {
                        from: process.env.MAIL_ADDRESS,
                        to: req.body.email,
                        subject: "Password Reset Code",
                        // text:
                        //     "Please use the code to reset your password. \nCode: " + random_code,
                        html:
                            "<style>" +
                            "    @import" +
                            "    url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;600;700;900&family=Poppins:wght@300&display=swap');" +
                            "    h1{" +
                            "    font-family: 'Nunito', sans-serif;" +
                            "    font-family: 'Poppins', sans-serif;" +
                            "}" +
                            "    p{" +
                            "    font-family: 'Nunito', sans-serif;" +
                            "    font-family: 'Poppins', sans-serif;" +
                            "</style>" +
                            "<div style='margin: 30px; padding: 20px; background-color: #e6e6e6'>" +
                            "    <h1 style='text-align: center; '>Welcome to ZAB Portal</h1>" +
                            "    <p>Please use the below code to reset your password for the email: " + data.email + " </p>" +
                            "    <p style='text-align: center; '><code>Code: " + random_code + "</code></p>" +
                            "    <hr>" +
                            "        <p style='font-style: italic; font-size: 12px; '>If you have any problem or query related to your profile, please" +
                            "            contact at this number: +92-333-0000000 | 051-1234567</p>" +
                            "        <p style='text-align: center; '>Regards: SZABIST MANAGEMENT | SZABIST ISLAMABAD</p>" +
                            "</div>"
                    };

                    data.update({reset_code: random_code});

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.status(error.responseCode).json({
                                'message': error.response
                            })
                        } else {
                            console.log("Email sent: " + info.response);
                            res.status(200).json({'message': "Email sent successfully to your email address. Check your email to reset your password"})
                        }
                    });
                }
                else {
                    res.status(404).json({'message': 'The provided email is not registered in the server.'})
                }
            })
            .catch(err => {
                res.status(500).json({'message': err.message});
            })
    }
    reset_password(req, res){
        const code = req.body.code;
        const new_password = req.body.new_password;
        const confirm_password = req.body.password_confirmation;

        models.User.findOne({ where: {email: req.body.email } })
            .then(user => {
                if (user.reset_code === code){
                    const salt = bcrypt.genSaltSync(parseInt(process.env.SECRET_SALT_ROUND_NUMBERS));
                    const password = bcrypt.hashSync(new_password, salt);
                    user.update({password: password, reset_code: null});
                    res.status(200).json({'message': 'Password updated successfully.'})
                }
                else {
                    res.status(404).json({'message': 'Invalid code. Please provide a valid code.'})
                }
            })
            .catch(err => {
                res.status(404).json({'message': 'No user found with the provided email.'});
            })
    }
}

module.exports = ForgotPasswordController;