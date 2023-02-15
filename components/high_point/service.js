const pointModel = require('./model');
/**
 * lấy danh sách sản phẩm
 */

 exports.getHightPointUser = async (user_id) => {
  const point = await pointModel.find({ user_id: user_id });
  return point;
}

// lấy điểm cao nhất của user
exports.getOnePointUser = async (user_id) => {
  const point = await pointModel.findOne({ user_id: user_id }).sort("-point");
  return point;
}
exports.updatePoint = async (user_id, map_id, level, point) => {
  console.log(user_id+"----"+map_id+"----"+point+"----"+level+"----");
  let result = true;
    await pointModel.updateMany({ user_id: user_id, map_id: map_id, level: level}, {point: point})
    .then(data =>{
      // console.log(">>>>>"+data);
      result = true;
    }).catch(err =>{
      console.log("thất bại");
      result = false;
    });
    return result;
}

exports.getHightPointLevel = async (level) => {
  const point = await pointModel.find({ level: level, point: {$gt: 0} })
  .populate('user_id').populate('map_id')
  .sort("-point").limit(10);
  return point;
}

exports.insert = async (pointUser) => {
  const p = new pointModel(pointUser);
  await p.save();
}