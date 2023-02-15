const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
    id: { type: ObjectId }, // khoa chinh
    username: { type: String, required: true },
    name: { type: String, default:""},
    password: { type: String },
    email: { type: String, default:"thuanvv17072002@gmail.com"},
    image: { type: String, default: "/images/user_avatar.jpg"},
    phone: { type: String, default:"0389289462"},
    address: { type: String, default:"Q.12, Tp.Ho Chi Minh"},
    CMND: { type: String, default:"0123456789"},
    age: { type: String, default:"20"},
    birthday: { type: Date, default:17/07/2002},
    sex: { type: String, default:"Nam"},
    description: { type: String, default:""},
    created_at: { type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('admin', adminSchema);
