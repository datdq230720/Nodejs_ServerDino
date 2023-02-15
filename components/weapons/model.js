const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Weapon = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image: { type: String },
    point: { type: Number },
    dame: { type: Number },
    describes: { type: String },
    code: { type: Number },
    status: { type: Boolean, default:true},
});

module.exports = mongoose.model('weapon', Weapon);