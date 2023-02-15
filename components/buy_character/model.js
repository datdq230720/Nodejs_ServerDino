const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const buy_characterSchema = new Schema({
    id: { type: ObjectId },
    user_id: { type: String },
    code: { type: Number },
    product_id: { type: String , ref: 'character'},
});

module.exports = mongoose.model('buy_character', buy_characterSchema);