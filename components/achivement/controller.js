const achivementServer = require('./service');


exports.getAllAchievement = async () => {
    let data = await achivementServer.getAllAchievements();
    return data;
}
exports.getOneAchievement = async (_id) => {
  let resulut = await achivementServer.getOneAchievement(_id);
    return resulut;
}

exports.insert = async (data) => {
  let resulut = await achivementServer.insert(data);
    return resulut;
}

exports.update = async (id, body) => {
  let resulut = await achivementServer.update(id, body);
    return resulut;
}

exports.delete = async (id) => {
  await achivementServer.delete(id);
}
