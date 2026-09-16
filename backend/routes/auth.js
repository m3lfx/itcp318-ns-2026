const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateProfile,
    updatePassword,
    allUsers,
    getUserDetails,
    deleteUser,
    updateUser,

} = require('../controllers/auth');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/me', isAuthenticatedUser, getUserProfile)
router.put('/me/update', isAuthenticatedUser, upload.single("avatar"), updateProfile)
router.put('/password/update', isAuthenticatedUser, updatePassword)
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers)

router.route('/admin/user/:id').get(isAuthenticatedUser, getUserDetails).delete(isAuthenticatedUser, deleteUser).put(isAuthenticatedUser, updateUser)
module.exports = router;