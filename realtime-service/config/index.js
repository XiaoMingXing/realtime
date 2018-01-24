var config = {
    local: {
        mode: 'local',
        port: 9001,
        db: 'mongodb://localhost:27017/local',
        dbOptions: {
            db: {native_parser: true},
            server: {poolSize: 5}
        }
    },
    staging: {
        mode: 'staging',
        port: 4000
    },
    production: {
        mode: 'production',
        port: 5000
    }
};

module.exports = function (mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};