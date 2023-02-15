const myAchivementServer = require('./service');
const achivementService = require('../achivement/service');


exports.getAllAchievement = async (user_id) => {
  let data = await myAchivementServer.getMyAchievement(user_id);
  data = data.map((item, index) => {
    let achievement = item.achivement_id;
    item = {
      id: item._id,
      name: achievement.name,
      reward: achievement.reward,
      requiment: achievement.requiment,
      description: achievement.description,
      achieved: item.achieved,
      date: item.date,
      rewarded: item.rewarded,
    }
    return item;
  })
  return data;
}
exports.getAllAchievement2 = async (user_id) => {
  let data = await myAchivementServer.getMyAchievement(user_id);
  data = data.map((item, index) => {
    let achievement = item.achivement_id;
    let Day = item.date
    if(item.achieved){
      Day = Day.getDate() + '-' + (Day.getMonth()+1) + '-' + Day.getFullYear();
    }
    item = {
      id: item._id,
      name: achievement.name,
      reward: achievement.reward,
      requiment: achievement.requiment,
      description: achievement.description,
      achieved: item.achieved,
      date: Day,
      rewarded: item.rewarded,
    }
    return item;
  })
  return data;
}
exports.getOneAchievement = async (_id) => {
  let data = await myAchivementServer.getOneAchievement(_id);
  return data;
}

exports.insert = async (id) => {
  let result = false;
  let achivement = await achivementService.getAllAchievements();
  for (let index = 0; index < achivement.length; index++) {
    const myAchivemnet = {
      achivement_id: achivement[index]._id,
      achieved: false,
      user_id: id,
      date: null,
      rewarded: false,
    }
    console.log(myAchivemnet)
    result = await myAchivementServer.insert(myAchivemnet);

  }

  return result;
}

exports.update = async (id, body) => {
  let data = await myAchivementServer.update(id, body);
  return data;
}
