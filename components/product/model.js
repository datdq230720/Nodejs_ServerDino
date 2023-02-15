const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    discount : { type: Number , default: 0 },
    description: { type: String , default: " " },
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    released: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('product', productSchema);