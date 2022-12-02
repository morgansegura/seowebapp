const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];
