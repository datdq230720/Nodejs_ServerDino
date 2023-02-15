const mapService = require("./service");

exports.getMaps = async () => {
  let data = await mapService.getMaps();
  // data = data.map((map) => {
  //     map = {
  //         _id: map._id,
  //         name: map.name,
  //         image: map.image,
  //         code: map.code,
  //         information: map.information,
  //     }
  //     return map;
  // })
  return data;
};

exports.getMapName = async () => {
  let name = await mapService.getMapName(); 
  name = name.map((item, index) => {
      return item.name;
  })
  return name;
}
// sd cho api của game
exports.getOneMapId = async (code) => {
  let map = await mapService.getOneMap2(code);
  map = {
    _id: map._id,
    name: map.name,
    code: map.code,
    information: map.information,
  };
  return _id;
};

exports.getOneMapById = async (id) => {
  let map = await mapService.getOneMapById(id);
  map = {
    _id: map._id,
    name: map.name,
    image: map.image,
    information: map.information,
  };
  return map;
};

exports.insert = async (body) => {
  const result = await mapService.insert(body);
  return result;
};

exports.insertMap = async (body) => {
  await mapService.insertMap(body);
};

exports.update = async (id, map) => {
  await mapService.update(id, map);
};

exports.editMap = async (id, map) => {
  await mapService.editMap(id, map);
  return { _id: map._id, name: map.name };
};

exports.delete = async (id) => {
  await mapService.delete(id);
};

exports.hidden = async (id, map) => {
  await mapService.hidden(id, map);
};

exports.unHidden = async (id, map) => {
  await mapService.unHidden(id, map);
};
