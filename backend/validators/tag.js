const { check } = require('express-validator');

exports.tagCreateValidator = [
    check('name').not().isEmpty().withMessage('Tag name is required'),
];
