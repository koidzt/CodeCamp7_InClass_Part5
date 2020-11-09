const { register, login, changePassword } = require('../controllers/user');
const router = require('express').Router();
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.post('/register', register);
router.post('/login', login);
router.put('/changePassword', auth, changePassword);

module.exports = router;