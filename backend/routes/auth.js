const express = require('express');
const router = express.Router();

// [Controllers]
const {
    register,
    signin,
    signout,
    requireSignin,
} = require('../controllers/auth');

// [Validation]
const { runValidation } = require('../validators');
const {
    userRegisterValidator,
    userSigninValidator,
} = require('../validators/auth');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/signout', signout);

// [Secret]
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'You have access to this secret page. Lucky.',
    });
});

module.exports = router;
