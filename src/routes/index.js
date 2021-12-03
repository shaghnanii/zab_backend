const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authenticateToken');

const Login = require('../controllers/Auth/LoginController')
const Register = require('../controllers/Auth/RegisterController')
const ForgotController = require('../controllers/Auth/ForgotPasswordController')
const LogoutController = require('../controllers/Auth/LogoutController')


// creating objects
const login = new Login;
const register = new Register;
const forgot = new ForgotController;
const logout = new LogoutController;
/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ------------------------------ Public Routes ----------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

// router.post('/auth/login', login.login_user);
router.post('/auth/login', login.login_user);

router.post('/auth/register', register.register_user);

router.post('/auth/forgot', forgot.send_email);

router.post('/auth/reset', forgot.reset_password);

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ---------------------------- Protected Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */
router.post('/auth/logout', logout.logout);

module.exports = router;