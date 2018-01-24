var bcrypt = require('bcrypt');

var User = require('../models/user');

function register(user, callback) {
    var userSchema = new User(user);
    userSchema.findByEmail()
        .then(function (result) {
            if (result) {
                callback(new Error("email already used!"))
            }
        })
        .then(function () {
            return bcrypt.hash(user.password, 5);
        })
        .then(function (hash) {
            userSchema
                .setPassword(hash)
                .save(callback)
        });
}

module.exports = {
    register: register
};