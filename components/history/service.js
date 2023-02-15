const historyModel = require('./model');

exports.getHistoryByUser = async (user_id) => {
    const history = await historyModel.find({user_id: user_id}).sort('-Date');
    return history;
}



exports.insert = async (history) => {
    const r = new historyModel(history);
    let result = null;
    await r.save().then(data =>{
        console.log(">>>>>"+data);
        result = true;
      }).catch(err =>{
        console.log("thất bại");
        result = false;
      });;
    return result;
}
exports.update = async (id, history) => {
    let result = null;
    await historyModel.findByIdAndUpdate(id, history)
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
    await historyModel.findIdAndDelete(id);
    
}
