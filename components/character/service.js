const Character = require('./model');


exports.getAllCharacter = async () => {
  const character = await Character.find();
  return character;
}

exports.getByIdCharacter = async (id) => {
  const character = await Character.findById(id);
  return character;
}
exports.getByCodeCharacter = async (code) => {
  const character = await Character.findOne({code: code});
    console.log("<><><><>-----><><><"+character);
    return character;
}
// lấy dữ liệu của trang phục theo giá tiền so sánh lớn hơn sắp xếp mã code
exports.getPriceCharacter = async (price) => {
    const character = await Character.find({price: {$gt : price}}).sort("code");
    return character;
} 
// lấy dữ liệu của trang phục theo điểm tổng so sánh lớn hơn sắp xếp mã code
exports.getPointCharacter = async (point) => {
  const character = await Character.find({point: {$gt : point}}).sort("code");
  return character;
}
// lấy dữ liệu của trang phục theo điểm tổng bé h
exports.getPointCharacterLt = async (point) => {
  const character = await Character.find({point: {$lte : point}, price: 0});
  return character;
}


exports.insert = async (product) => {
    const p = new Character(product);
    let result = null;
    await p.save().then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });;
    return result;
}
exports.update = async (id) => {
    await Character.findByIdAndUpdate(id, weapon)
    .then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });
    return result;
    
}

exports.editCharacter = async (id,character) => {
  await Character.findByIdAndUpdate(id,character)
}

exports.delete = async (id) => {
    await Character.findIdAndDelete(id);
    
}