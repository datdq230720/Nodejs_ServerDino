const Weapons = require('./model');


exports.getAllWeapon = async () => {
  const weapon = await Weapons.find();
  return weapon;
}

exports.getByIdWeapon = async (id) => {
  const weapon = await Weapons.findById(id);
  return weapon;
}

exports.getPointWeapon = async () => {
    const weapon = await Weapons.find({point: {$gt : 0}}).sort('code');
    return weapon;
}
exports.getUserWeapon = async (point) => {
  const weapon = await Weapons.find({point: {$lte : point}});
  return weapon;
}

exports.insert = async (product) => {
    const p = new Weapons(product);
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
    await Weapons.findByIdAndUpdate(id)
    .then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });
    return result;
    
}
exports.delete = async (id) => {
    await Weapons.findIdAndDelete(id);
    
}

exports.editWeapons = async (id, weapons) => {
  await Weapons.findByIdAndUpdate(id,weapons);
}

exports.insertWeapons = async (weapons) => {
  const w= new Weapons(weapons);
  await w.save();
}

exports.hidden = async (id,status) => {
  var status = false;
  const weapons = await Weapons.findById(id);
  weapons.status = status;   
  await Weapons.findByIdAndUpdate(id, weapons);
  return weapons;
}

exports.unHidden = async (id,status) => {
  var status = true;
  const weapons = await Weapons.findById(id);
  weapons.status = status;   
  await Weapons.findByIdAndUpdate(id, weapons);
  return weapons;
}