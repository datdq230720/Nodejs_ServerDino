const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Monter = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    category: { type: String },
    hp: { type: Number },
    describes: { type: String },
    status: { type: Boolean, default:true},
});

module.exports = mongoose.model('monter', Monter);