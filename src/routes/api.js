const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticateToken');

// middlewares
const check_admin = require('../middlewares/is_admin');
const check_student = require('../middlewares/is_student');
const check_pm = require('../middlewares/is_pm');
const check_supervisor = require('../middlewares/is_supervisor');

// validation requests
const login_validation = require('../Requests/Auth/LoginRequest')
const register_validation = require('../Requests/Auth/RegisterRequest')
const forgot_password_validation = require('../Requests/Auth/ForgotPasswordRequest')
const reset_password_validation = require('../Requests/Auth/ResetPasswordRequest')


// admin validations
const admin_add_new_student_validation = require('../Requests/Admin/Students/AdminStudentStoreRequest')
const admin_add_new_supervisor_validation = require('../Requests/Admin/Supervisors/AdminSupervisorStoreRequest')
const admin_add_new_pm_validation = require('../Requests/Admin/Pms/AdminPmStoreRequest')
const admin_add_new_fyp_validation = require('../Requests/Admin/Fyps/AdminFypStoreRequest')
const complete_profile_validation = require('../Requests/Profile/CompleteProfileRequest')

// controllers
const Login = require('../controllers/Auth/LoginController')
const Register = require('../controllers/Auth/RegisterController')
const ForgotController = require('../controllers/Auth/ForgotPasswordController')
const LogoutController = require('../controllers/Auth/LogoutController')

const ProfileController = require('../controllers/Auth/ProfileController')
const DropdownController = require('../controllers/DropdownController')

// admin controllers
const AdminStudentController = require('../controllers/Admin/Students/StudentController')
const AdminSupervisorController = require('../controllers/Admin/Supervisors/SupervisorController')
const AdminPmController = require('../controllers/Admin/Pms/PmController')
const AdminFypController = require('../controllers/Admin/Fyps/FypController')


// Student Controllers
const StudentController = require('../controllers/Student/StudentController')

// PM Controllers
const PmController = require('../controllers/PM/PmController')

// Supervisor Controllers
const SupervisorController = require('../controllers/Supervisor/SupervisorController')

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

router.get('/dropdown-data', (new DropdownController).dropdown_data);
router.post('/dropdown-departments', (new DropdownController).dropdown_departments);

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ---------------------------- Protected Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/auth/logout', auth, (new LogoutController).logout);
router.get('/profile', auth, (new ProfileController).profile);
router.post('/complete-profile', auth, complete_profile_validation.complete_profile_request, (new ProfileController).complete_profile);


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

router.get('/admin/supervisors', auth, check_admin, (new AdminSupervisorController).index);
router.get('/admin/supervisors/:id', auth, check_admin, (new AdminSupervisorController).show);
router.post('/admin/supervisors', auth, check_admin, admin_add_new_supervisor_validation.admin_add_supervisor, (new AdminSupervisorController).store);
router.put('/admin/supervisors/:id', auth, check_admin, (new AdminSupervisorController).update);
router.delete('/admin/supervisors/:id', auth, check_admin, (new AdminSupervisorController).delete);

router.get('/admin/pms', auth, check_admin, (new AdminPmController).index);
router.get('/admin/pms/:id', auth, check_admin, (new AdminPmController).show);
router.post('/admin/pms', auth, check_admin, admin_add_new_pm_validation.admin_add_pm, (new AdminPmController).store);
router.put('/admin/pms/:id', auth, check_admin, (new AdminPmController).update);
router.delete('/admin/pms/:id', auth, check_admin, (new AdminPmController).delete);


router.get('/admin/fyps', auth, check_admin, (new AdminFypController).index);
router.get('/admin/fyps/:id', auth, check_admin, (new AdminFypController).show);
router.post('/admin/fyps', auth, check_admin, admin_add_new_fyp_validation.admin_add_fyp, (new AdminFypController).store);
router.put('/admin/fyps/:id', auth, check_admin, admin_add_new_fyp_validation.admin_add_fyp, (new AdminFypController).update);
router.delete('/admin/fyps/:id', auth, check_admin, (new AdminFypController).delete);



/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ----------------------------- Students Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/students', auth, check_student, (new StudentController).index)

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------- Supervisors Routes ---------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/supervisors', auth, check_supervisor, (new SupervisorController).index)

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ----------------------------------- PM Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */
router.get('/pms', auth, check_pm, (new PmController).index)


module.exports = router;