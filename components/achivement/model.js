const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const achievement = new Schema({
    id: { type: ObjectId },
    name: { type: String }, // tên
    reward: { type: Number }, // phần thưởng 
    requiment: { type: Number }, // yêu cầu
    description: { type: String }, // mô tả
});

module.exports = mongoose.model('achievement', achievement);