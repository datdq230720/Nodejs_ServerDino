const characterServer = require('../character/service');
const buyService = require('./service');


// lấy code trang phục đã mua ra cho game
exports.getIdProductGame = async (user_id) => {
    let product = await buyService.getIdProductGame(user_id);
    console.log(product);
    const arrProduct = [];
    product = product.map((item, index) => {
        arrProduct.push(item.code);
        return item;
    })
    return arrProduct;
}
exports.insert = async (body) =>{
    let c = await characterServer.getByCodeCharacter(body.code);
    console.log(body.code+"<><><><><><><><><"+c);
    body = {
        _id: body._id,
        user_id: body.user_id,
        code: body.code,
        ... ({product_id: c._id})
    } 

    await buyService.insert(body);
}