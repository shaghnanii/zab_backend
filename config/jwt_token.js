const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const models = require('../server/models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                password = await bcrypt.hash(password, saltRounds)
                const user = await models.User.create({ email, password });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            console.log("inside jwt token class.. ********************************** ")
            models.User.findOne({ where: { email: email } })
                .then(data => {
                    console.log("inside : data ********************************** ", data)
                    if (!data) {
                        return done(null, false, { message: 'User not found' });
                    }
                    check = bcrypt.compareSync(password, data.password);
                    if (!check) {
                        return done(null, false, { message: 'Wrong Password' });
                    }
                    return done(null, data, { message: 'Logged in Successfully' });
                }).catch (error => {
                return done(error);
            })
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'ZAB_FYP_PORTAL_TOP_SECRET_API_TOKEN_KEY',
            // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);