const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
            lowercase: true,
        },
        firstName: {
            type: String,
            trim: true,
            required: true,
            max: 32,
        },
        lastName: {
            type: String,
            trim: true,
            required: false,
            max: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            lowercase: true,
        },
        profile: {
            type: String,
            requried: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        salt: String,
        about: {
            type: String,
        },
        role: {
            type: Number,
            trin: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        resetPasswordLink: {
            data: String,
            default: '',
        },
    },
    { timestamp: true }
);

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function (password) {
        if (!password) return '';

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
};

module.exports = mongoose.model('User', userSchema);
