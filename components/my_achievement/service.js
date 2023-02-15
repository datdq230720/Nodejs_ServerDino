const myAchievement = require('./model');

exports.getMyAchievement = async (user_id) => {
  const character = await myAchievement.find({ user_id: user_id }).sort('-achieved').populate('achivement_id');
  return character;
}
exports.getOneAchievement = async (id) => {
  const character = await myAchievement.findById(id);
  return character;
}

exports.insert = async (data) => {
  let result = null;
  const p = new myAchievement(data);
  await p.save().then(_data => {
    console.log(">>>>>" + _data);
    result = true;
  }).catch(err => {
    console.log("thất bại");
    result = false;
  });
  return result;
}
exports.update = async (id, achievement) => {
  await myAchievement.findByIdAndUpdate(id, achievement)
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
  await myAchievement.findIdAndDelete(id);

}

