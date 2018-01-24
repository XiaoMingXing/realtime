let users = require('../models/user');
let UsernameOrPasswordInvalidError = require('../errors').UsernameOrPasswordInvalidError;
let UserNotExistError = require('../errors').UserNotExistError;
let bcrypt = require('bcrypt');

function usernameAndPasswordAuth(user, callback) {
    users.findOne({email: user.email}, function (err, existUser) {

        if (err) return callback(err);

        if (!existUser) return callback(new UserNotExistError(user.email));

        bcrypt.compare(user.password, existUser.password, function (err, isValid) {
            if (err) {
                callback(err);
            } else if (!isValid) {
                callback(new UsernameOrPasswordInvalidError());
            } else {
                callback(null, {
                    user_id: existUser._id.toString(),
                    nickname: existUser.nickname,
                    email: existUser.email
                });
            }
        });
    });
}

module.exports = {
    usernameAndPasswordAuth: usernameAndPasswordAuth
};