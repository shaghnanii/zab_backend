const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();
const models = require('../../server/models/index')

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        console.log('error', err)
                        console.log('usesr', user)
                        console.log('usesr', info)
                        return next(error);
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
                            const body = { id: user.id, email: user.email, role_id: user.role_id };
                            const token = jwt.sign({ user: body }, 'ZAB_FYP_PORTAL_TOP_SECRET_API_TOKEN_KEY', { expiresIn: '24h' });
                            res.status(200).json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

router.post('/forgot-password', (req, res, next) => {
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
                const from_email = "laravel.test.2020@gmail.com";
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: "laravel.test.2020@gmail.com",
                        pass: "shakil@1236",
                    },
                });

                const random_code = Math.floor(Math.random() * (99999 - 23421) + 23421);
                const mailOptions = {
                    from: "laravel.test.2020@gmail.com",
                    to: req.body.email,
                    subject: "Password Reset Code",
                    text:
                        "Please use the code to reset your password. \nCode: " + random_code,
                };

                models.User.findAll({where: {email: req.body.email}})
                    .then(data => {
                        if (data){
                            data[0].update({resetCode: random_code});
                        }
                        else {
                            res.json({'message': "Something went wrong, please try again later", 'status': 404})
                        }
                    })
                    .catch(err => {
                        res.json({'message': err, 'status': 404})
                    })

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                        res.json({'message': "Email sent successfully to your email address. Check your email to reset your password", 'status': 200})
                    }
                });
            }
            else {
                res.json({'message': 'The provided email is not registered in the server.', 'status': 404})
            }
        })
        .catch(err => {
            res.json({'message': err, 'status': 404});
        })
});

router.post('/reset', (req, res, next) => {
    const code = req.body.code;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed = bcrypt.hashSync(req.body.password, salt);
    console.log("##################################### PASSWORD: " + req.body.password);
    models.User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (code == data.resetCode){
                // all the fields are ok now update the password
                models.User.update({password: hashed}, {where: {email: req.body.email}})
                    .then(data => {
                        if (data == 1){
                            res.json({'message': 'Password Successfully Reset. Please Login with your new password.', 'status': '200'})
                        }
                        else {
                            res.json({'message': "Something went wrong. Please try again.", "status":'404'})
                        }
                    })
            }
            else {
                res.json({'message': "The provided code is not correct. Please enter a correct one", "status":'404'})
            }
        });
})

module.exports = router;
