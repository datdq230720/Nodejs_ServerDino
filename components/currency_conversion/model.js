const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const currencyConversion = new Schema({
    id: { type: ObjectId },
    money: { type: Number },
    exchangeMoney: { type: Number },
    status: { type: Boolean, default:true},
});

module.exports = mongoose.model('currencyConversion', currencyConversion);