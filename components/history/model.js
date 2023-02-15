const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const history = new Schema({
    id: { type: ObjectId },
    user_id: { type: String },
    action: { type: String },
    Date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('history', history);