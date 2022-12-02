const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

exports.register = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already in use',
            });
        }
        const { firstName, lastName, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({
            firstName,
            lastName,
            email,
            password,
            profile,
            username,
        });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            // res.json({ user: success });
            res.json({ message: 'Registration successful. Please signin.' });
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'The user does not exist',
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Your credentials are incorrect',
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, firstName, lastName, email, role } = user;
        return res.json({
            token,
            user: {
                _id,
                username,
                firstName,
                lastName,
                email,
                role,
            },
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Successfully signed out',
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // added later
    userProperty: 'auth',
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.auth._id;

    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }

        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.auth._id;

    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User does not exist',
            });
        }
        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Access denied',
            });
        }
        req.profile = user;
        next();
    });
};
