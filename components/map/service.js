const mapModel = require('./model');

exports.getMaps = async () => {
  let maps = await mapModel.find();
  return maps;
}
exports.getMapName = async () => {
  let maps = await mapModel.find().sort('code');
  return maps;
}
exports.getOneMap = async (id) => {
  let map = await mapModel.findOne({ id: id });
  return map;
}
exports.getOneMap2 = async (code) => {
  let map = await mapModel.findOne({ code: code });
  return map;
}

exports.getOneMapById = async (id) => {
  let map = await mapModel.findById(id);
  return map;
}

exports.insert = async (map) => {
  let m = await mapModel(map);
  let result = null;
  await m.save().then(data => {
    console.log(">>>>>" + data);
    result = true;
  }).catch(err => {
    console.log("thất bại");
    result = false;
  });;
  return result;
}
exports.update = async (id) => {
  await mapModel.findByIdAndUpdate(id)
    .then(data => {
      console.log(">>>>>" + data);
      result = true;
    }).catch(err => {
      console.log("thất bại");
      result = false;
    });
  return result;

}
exports.delete = async (id) => {
  await mapModel.findIdAndDelete(id);

}

exports.editMap = async (id, map) => {
  await mapModel.findByIdAndUpdate(id, map);
}

exports.insertMap = async (map) => {
  const m= new mapModel(map);
  await m.save();
}

exports.hidden = async (id,status) => {
  var status = false;
  const map = await mapModel.findById(id);
  map.status = status;   
  await mapModel.findByIdAndUpdate(id, map);
  return map;
}

exports.unHidden = async (id,status) => {
  var status = true;
  const map = await mapModel.findById(id);
  map.status = status;   
  await mapModel.findByIdAndUpdate(id, map);
  return map;
}