// Bring Mongoose into the app
let mongoose = require('mongoose'),
    config = require('../config');

let default_options = {
    db: {native_parser: true},
    server: {poolSize: 5}
};

let initial_mongoose = function (config) {
    config = JSON.parse(config);
    console.log("Mongo Url:", config.mongo_url);
    if (config) {
        mongoose.connect(config.mongo_url, default_options);
    }

// CONNECTION EVENTS
// When successfully connected
    mongoose.connection.on('connected', function (db) {
        console.log('Mongoose default connection open to ' + config.mongo_url);
    });

// If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
};

config.load_config(initial_mongoose);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});