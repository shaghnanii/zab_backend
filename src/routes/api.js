const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticateToken');

// middlewares
const check_admin = require('../middlewares/is_admin');
// validation requests
const login_validation = require('../Requests/Auth/LoginRequest')
const register_validation = require('../Requests/Auth/RegisterRequest')
const forgot_password_validation = require('../Requests/Auth/ForgotPasswordRequest')
const reset_password_validation = require('../Requests/Auth/ResetPasswordRequest')


// admin validations
const admin_add_new_student_validation = require('../Requests/Admin/Students/AdminStudentStoreRequest')

// controllers
const Login = require('../controllers/Auth/LoginController')
const Register = require('../controllers/Auth/RegisterController')
const ForgotController = require('../controllers/Auth/ForgotPasswordController')
const LogoutController = require('../controllers/Auth/LogoutController')

// admin controllers
const AdminStudentController = require('../controllers/Admin/Students/StudentController')


/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ------------------------------ Public Routes ----------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

// router.post('/auth/login', login.login_user);
router.post('/auth/login', login_validation.login_request, (new Login).login_user);

router.post('/auth/register', register_validation.register_request, (new Register).register_user);

router.post('/auth/forgot', forgot_password_validation.forgot_password, (new ForgotController).send_email);

router.post('/auth/reset', reset_password_validation.reset_password, (new ForgotController).reset_password);

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ---------------------------- Protected Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/auth/logout', auth, (new LogoutController).logout);


/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------- Admin Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/admin/students', auth, check_admin, (new AdminStudentController).index);
router.get('/admin/students/:id', auth, check_admin, (new AdminStudentController).show);
router.post('/admin/students', auth, check_admin, admin_add_new_student_validation.admin_add_student, (new AdminStudentController).store);
router.put('/admin/students/:id', auth, check_admin, (new AdminStudentController).update);
router.delete('/admin/students/:id', auth, check_admin, (new AdminStudentController).delete);



/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ----------------------------- Students Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */



/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------- Supervisors Routes ---------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */


/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ----------------------------------- PM Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */



module.exports = router;