const characterServer = require('./service');

exports.getAllCharacter = async () => {
    let character = await characterServer.getAllCharacter();
    // character = character.map(item => {
    //     item = {
    //         _id: item._id,
    //         name: item.name,
    //         image: item.image,
    //         price: item.price,
    //         point: item.point,
    //         describes: item.describes,
    //         code: item.code,
    //     }
    //     return item;
    // })
    return character;
}
exports.getByIdCharacter = async (id) => {
    let character = await characterServer.getByIdCharacter(id);
    character = {
        _id: character._id,
        name: character.name,
        image: character.image,
        price: character.price,
        point: character.point,
        describes: character.describes,
        code: character.code,
    }
    return character;
}

exports.getPriceCharacter = async () => {
    let data = await characterServer.getPriceCharacter(0);
    const arrPrice = [];
    data.map((item, index) => {
        arrPrice.push(item.price);
        return item;
    })
    return arrPrice;
}
exports.getPointCharacter = async () => {
    let data = await characterServer.getPointCharacter(0);
    const arrPrice = [];
    data.map((item, index) => {
        arrPrice.push(item.point);
        return item;
    })
    return arrPrice;
}
exports.delete = async (id) => {
    await characterServer.delete(id);
}
exports.insert = async (body) => {
    const result = await characterServer.insert(body);
    return result;
}

exports.update = async (id, product) => {
    await characterServer.update(id, product);
}

exports.editCharacter = async (id, character) => {
    await characterServer.editCharacter(id, character);
    return { _id: character._id, character: character.name };
}
// sd cho api của game 


