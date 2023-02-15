const weaponServer = require('./service');


exports.getAllWeapon = async () => {
    let weapon = await weaponServer.getAllWeapon();
    // weapon = weapon.map(item => {
    //     item = {
    //         _id: item._id,
    //         name: item.name,
    //         image: item.image,
    //         point: item.point,
    //         dame: item.dame,
    //         describes: item.describes,
    //         code: item.code,
    //     }
    //     return item;
    // })
    return weapon;
}
exports.getByIdWeapon = async (id) => {
    let weapon = await weaponServer.getByIdWeapon(id);
    weapon = {
        _id: weapon._id,
        name: weapon.name,
        image: weapon.image,
        point: weapon.point,
        dame: weapon.dame,
        describes: weapon.describes,
        code: weapon.code,
    }
    return weapon;
}
//lấy điểm để mở khóa vũ khí
exports.getPointWeapon = async () => {
    let data = await weaponServer.getPointWeapon();
    const arrPrice = [];
    data.map((item, index) => {
        console.log("code: " + item.code);
        arrPrice.push(item.point);
        return item;
    })
    return arrPrice;
}
exports.delete = async (id) => {
    await weaponServer.delete(id);
}
exports.insert = async (body) => {
    const result = await characterServer.insert(body);
    return result;
}

exports.update = async (id, product) => {
    await characterServer.update(id, product);
}

exports.editWeapons = async (id, weapons) => {
    await weaponServer.editWeapons(id, weapons);
    return { _id: weapons._id, weapons: weapons.name };
}
// sd cho api của game

exports.insertWeapons = async (body) => {
    await weaponServer.insertWeapons(body);
  };
  
  exports.hidden = async (id, map) => {
    await weaponServer.hidden(id, map);
  };
  
  exports.unHidden = async (id, map) => {
    await weaponServer.unHidden(id, map);
  };


