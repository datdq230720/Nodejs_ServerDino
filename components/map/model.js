const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const map = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    code: { type: String },
    information: { type: String },
    status: { type: Boolean, default:true},
});

module.exports = mongoose.model('map', map);