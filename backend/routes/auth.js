const express = require('express');
const router = express.Router();

const {registerUser, 
    loginUser,
    getUserProfile,
    updatePassword, 
    updateProfile, 
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
    } = require('../controllers/authController');
const {isAuthenticatedUser ,authorizeRoles}= require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/admin/users').get( allUsers)
router.route('/admin/users/:id').get(getUserDetails)
                                .put(updateUser)// only admin can update a user
                                .delete(deleteUser)
module.exports = router 