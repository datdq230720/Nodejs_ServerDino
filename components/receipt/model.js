const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const receipt = new Schema({
    id: { type: ObjectId },
    user_id: { type: String, ref: 'user' },
    price: { type: Number },
    coin: { type: Number },
    Date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('receipt', receipt);