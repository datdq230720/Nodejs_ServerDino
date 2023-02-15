const Monters = require('./model');

exports.getAllMonters = async () => {
  const monter = await Monters.find().sort('-hp');
  return monter;
}

exports.getByIdMonter = async (id) => {
  const monter = await Monters.findById(id);
  return monter;
}

exports.insert = async (data) => {
    const p = new Monters(data);
    let result = null;
    await p.save().then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });
    return result;
}
exports.update = async (id,monter) => {
    await Monters.findByIdAndUpdate(id,monter)
    .then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });
    return result;
    
}

exports.delete = async(id) =>{
  await Monters.findByIdAndDelete(id);
}

exports.insertMonter = async (monter) => {
  const m= new Monters(monter);
  await m.save();
}

exports.hidden = async (id,status) => {
  var status = false;
  const monter = await Monters.findById(id);
  monter.status = status;   
  await Monters.findByIdAndUpdate(id, monter);
  return monter;
}

exports.unHidden = async (id,status) => {
  var status = true;
  const monter = await Monters.findById(id);
  monter.status = status;   
  await Monters.findByIdAndUpdate(id, monter);
  return monter;
}