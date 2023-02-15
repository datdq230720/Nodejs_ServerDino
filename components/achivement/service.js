const achievementModel = require('./model');

exports.getAllAchievements = async () => {
  const achivement = await achievementModel.find();
  return achivement;
}
exports.getOneAchievement = async (id) => {
  const achivement = await achievementModel.findById(id);
  return achivement;
}

exports.insert = async (data) => {
  let result = null;
  for (let index = 0; index < testData.length; index++) {
    const p = new achievementModel(data);
    await p.save().then(_data => {
      console.log(">>>>>" + _data);
      result = true;
    }).catch(err => {
      console.log("thất bại");
      result = false;
    });
  }
  return result;
}
exports.update = async (id, achievement) => {
  await achievementModel.findByIdAndUpdate(id, achievement)
    .then(data => {
      console.log(">>>>>" + data);
      result = true;
    }).catch(err => {
      console.log("thất bại");
      result = false;
    });
  return result;

}

