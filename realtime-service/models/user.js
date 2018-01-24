var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var userSchema = new Schema({
    id: String,
    username: String,
    password: String,
    nickname: String,
    gender: String,
    email: String
});

userSchema.methods.findByEmail = function (callback) {
    return this.model('User').findOne({
        email: this.email
    });
};

userSchema.methods.findByName = function () {
    return this.model('User').findOne({
        username: this.username
    });
};

userSchema.methods.setPassword = function (password) {
    this.password = password;
    return this;
};

module.exports = mongoose.model('User', userSchema);