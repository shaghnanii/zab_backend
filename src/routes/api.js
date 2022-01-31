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


// students validations
const student_add_fyp_validation = require('../Requests/Student/Fyp/FypStoreRequest');

const student_create_group_validation = require('../Requests/Student/Group/GroupStoreRequest');


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
const StudentFypController = require('../controllers/Student/FypController')

const StudentCommentController = require('../controllers/Student/StudentComment')
const StudentResultController = require('../controllers/Student/ResultController')

const GroupController = require('../controllers/Student/GroupController')

// PM Controllers
const PmController = require('../controllers/PM/PmController')
const PannelController = require('../controllers/PM/PannelController')

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

router.get('/dropdown-data', auth, (new DropdownController).dropdown_data);
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

router.get('/student-comments', auth, check_student, (new StudentCommentController).index)
router.get('/student-results', auth, check_student, (new StudentResultController()).index)


router.get('/fyps', auth, check_student, (new StudentFypController).index)
router.get('/student-fyp', auth, check_student, (new StudentFypController).check_student_fyp)
router.get('/fyps/:id', auth, check_student, (new StudentFypController).show)
router.post('/fyps', auth, check_student, student_add_fyp_validation.student_fyp_store_request, (new StudentFypController).store)
router.put('/fyps', auth, check_student, (new StudentFypController).update)
router.delete('/fyps', auth, check_student, (new StudentFypController).delete)


router.get('/groups', auth, check_student, (new GroupController).index);
router.get('/active-groups', auth, check_student, (new GroupController).active_groups);
router.get('/groups/:id', auth, check_student, (new GroupController).show);
router.post('/groups', auth, check_student, student_create_group_validation.student_create_group_request, (new GroupController).store);

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------- Supervisors Routes ---------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */

router.get('/supervisors', auth, (new SupervisorController).index)
router.get('/supervisors/:id', auth, (new SupervisorController).show)
router.get('/supervisors', auth, check_supervisor, (new SupervisorController).show)

/**
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 *  ----------------------------------- PM Routes ---------------------------------------
 *  -------------------------------------------------------------------------------------
 *  -------------------------------------------------------------------------------------
 */
router.get('/pms', auth, check_pm, (new PmController).index)

router.get('/pm-fyp-one', auth, check_pm, (new PmController).fyp_one)
router.get('/pm-fyp-two', auth, check_pm, (new PmController).fyp_two)
router.get('/pms-part-one-attendances-and-comments', auth, check_pm, (new PmController).one_comments)
router.get('/pms-part-two-attendances-and-comments', auth, check_pm, (new PmController).two_comments)

router.post('/pannels', auth, check_pm, (new PannelController).store)


module.exports = router;