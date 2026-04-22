const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth');
const { getMe, updateMe, updatePassword } = require('../controllers/userController');
const { updateMeValidator, updatePasswordValidator } = require('../validators/userValidator');

router.get('/',          authenticate, getMe);
router.put('/',          authenticate, updateMeValidator,    updateMe);
router.put('/password',  authenticate, updatePasswordValidator, updatePassword);

module.exports = router;