var express = require('express');
var router = express.Router();
var authService = require('../services/authService');

/* simple username password authentication. */
router.post('/simple', function (req, res, next) {
    authService.usernameAndPasswordAuth(req.body, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.json({data: user});
        }
    });
});

router.get('/noauth', function (req, res) {
    console.log('Authentication Failed');
    res.send('Authentication Failed');
});

module.exports = router;
