let Record = require('../models/record');


function realTimePv(callback) {
    Record.collection
        .find({}, {tailable: true, awaitdata: true, numberOfRetries: -1})
        .each(function (err, doc) {
            console.log("doc changed", doc);
            docSize(callback);
        })
}

function listeningMongo(callback) {
    let stream = Record.collection
        .find({}, {tailable: true, awaitdata: true, numberOfRetries: -1})
        .stream();
    stream.on('data', callback);
}

function docSize(callback) {
    Record.collection.count({}).then(callback);
}

module.exports = {
    totalPv: realTimePv,
    listeningMongo: listeningMongo,
    docSize: docSize
};