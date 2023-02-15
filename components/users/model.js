const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, default:"",},
    points: { type: Number,default: 0},
    password: { type: String },
    price: { type: Number, default: 0},
    googleId: { type: String, default:"",},
    email: { type: String, default:"",},
    image: { type: String, default: "https://cdn-icons-png.flaticon.com/512/25/25634.png"},
    Date: { type: Date, default: Date.now() },
    status: { type: Boolean, default:true },
});


//user so it
module.exports = mongoose.model('user', userSchema);
