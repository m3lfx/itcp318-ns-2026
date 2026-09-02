const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const {
    registerUser,
    loginUser,

} = require('../controllers/auth');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', loginUser);
module.exports = router;