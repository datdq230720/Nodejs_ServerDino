const historyService = require('./service');

exports.getHistoryByUser = async (user_id) => {
    let data = await historyService.getHistoryByUser(user_id);
    data = data.map((history) => {
        let Day = history.Date;
        history = {
            user_id: history.user_id,
            action: history.action,
            date: Day.getDate() + "-" + Day.getMonth() + "-" + Day.getFullYear() + " " + Day.getHours() + ":" + Day.getMinutes() + ":" + Day.getSeconds(),
        }
        return history;
    })
    return data;
}


exports.insert = async (_user_id, _action) => {
    let body = {
        user_id: _user_id,
        action: _action,
        date: Date.now()
    }
    const result = await historyService.insert(body);
    return result;
}

exports.update = async (id, history) => {
    const result = await historyService.update(id, history);
    return result;
}

exports.delete = async (id) => {
    const result = await historyService.delete(id);
    return result;
}