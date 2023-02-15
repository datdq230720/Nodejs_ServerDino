const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const high_point = new Schema({
    id: { type: ObjectId },
    user_id: { type: String, ref: 'user' }, // mã id user
    map_id: { type: String, ref: 'map' }, // mã id map
    point: { type: Number }, // điểm cao nhất theo map 
    level: { type: Number }, // độ khó
    
});

module.exports = mongoose.model('high_point', high_point);