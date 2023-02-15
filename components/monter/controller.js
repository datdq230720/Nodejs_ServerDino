const monterServer = require("./service");

exports.getAllMonter = async () => {
  let monter = await monterServer.getAllMonters();
  // monter = monter.map(item => {
  //     item = {
  //         _id: item._id,
  //         name: item.name,
  //         image: item.image,
  //         category: item.category,
  //         hp: item.hp,
  //         describes: item.describes,
  //     }
  //     return item;
  // })
  return monter;
};
exports.getByIdWeapon = async (id) => {
  let monter = await monterServer.getByIdMonter(id);
  monter = {
    _id: monter._id,
    name: monter.name,
    image: monter.image,
    category: monter.category,
    hp: monter.hp,
    describes: monter.describes,
  };
  return monter;
};

exports.getPointWeapon = async () => {
  let data = await monterServer.getPointWeapon();
  return data;
};
exports.insert = async (body) => {
  const result = await monterServer.insert(body);
  return result;
};
exports.update = async (id, monter) => {
  await monterServer.update(id, monter);
};
exports.delete = async (id) => {
  await monterServer.delete(id);
};

exports.insertMonter = async (body) => {
  await monterServer.insertMonter(body);
};

exports.hidden = async (id, map) => {
  await monterServer.hidden(id, map);
};

exports.unHidden = async (id, map) => {
  await monterServer.unHidden(id, map);
};
