const buyModel = require('./model');
/**
 * lấy danh sách sản phẩm
 */

 exports.insert = async (buy_product) => {
    const b= new buyModel(buy_product);
    await b.save();
  }
  exports.getIdProductGame = async (user_id) => {
    const b = await buyModel.find({user_id: user_id});
    return b;
  }
  exports.getIdProductGame2 = async (user_id) => {
    const b = await buyModel.find({ user_id: user_id })
    .populate('product_id');
    return b;
  }
