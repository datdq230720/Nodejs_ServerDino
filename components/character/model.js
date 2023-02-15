const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Character = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    point: { type: Number },
    describes: { type: String },
    code: { type: Number },
});

module.exports = mongoose.model('character', Character);