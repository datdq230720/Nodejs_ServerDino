const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const myAchievement = new Schema({
    id: { type: ObjectId },
    achivement_id: { type: String, ref: 'achievement' }, // mã thành tựu
    achieved: { type: Boolean, default: false  }, // Xác nhận hoàn thành
    user_id: { type: String }, // Mã người chơi
    date: { type: Date, default: null }, // Ngày hoàn thành
    rewarded: { type: Boolean, default: false}, // Xác nhận đã nhận thưởng

});

module.exports = mongoose.model('myachievement', myAchievement);