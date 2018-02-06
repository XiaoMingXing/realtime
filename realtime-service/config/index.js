// let config = {
//     local: {
//         mode: 'local',
//         port: 9001,
//         db: 'mongodb://35.187.230.101:27017/local',
//         dbOptions: {
//             db: {native_parser: true},
//             server: {poolSize: 5}
//         }
//     },
//     staging: {
//         mode: 'staging',
//         port: 4000
//     },
//     production: {
//         mode: 'production',
//         port: 5000
//     }
// };

let http = require('http');

function load_config(callback) {
    let options = {
        host: "localhost",
        port: 9999,
        path: '/config/local',
        method: 'GET'
    };

    http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', callback);
    }).end();
}


module.exports = {
    load_config: load_config
};