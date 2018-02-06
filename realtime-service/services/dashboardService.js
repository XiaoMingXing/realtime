let Record = require('../models/record');


function realTimePv(callback) {



    Record.collection
        .find({}, {tailable: true, awaitdata: true, numberOfRetries: -1})
        .each(function (err, doc) {
            docSize(callback);
        })
}

function listeningMongo(callback) {
    let stream = Record.collection
        .find({}, {tailable: true, awaitdata: true, numberOfRetries: -1})
        .stream();
    stream.on('data', callback);
}

function convertFormat(rows) {
    if (!rows || !rows.length) {
        return
    }
    let result = {};
    for (let index = 0; index < rows.length; index++) {
        row = rows[index];
        result[row["_id"]] = row["count"]
    }
    return result;
}

function docSize(callback) {
    let _this = this;
    let total = 0;
    Record.collection.count({})
        .then(function (result) {
            total = result;
            Record.collection.aggregate([
                {"$group": {_id: "$browser", count: {$sum: 1}}}
            ], function (err, result) {
                callback({total: total, distribute: convertFormat(result)})
            })
        })
}

module.exports = {
    totalPv: realTimePv,
    listeningMongo: listeningMongo,
    docSize: docSize
};