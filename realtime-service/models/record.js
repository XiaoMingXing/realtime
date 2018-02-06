let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//if no collection name specified, will use model name as collection name
// can only define parts of fields
let recordSchema = new Schema({
    userId: String
}, {collection: 'activities', capped: {size: 102400, max: 100000, autoIndexId: true}});

let Record = mongoose.model('Record', recordSchema);

module.exports = Record;