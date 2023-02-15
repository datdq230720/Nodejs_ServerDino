const pointService = require('./service');
const mapService = require('../map/service');
const userService = require('../users/service');

exports.insert = async (body) => {
    await pointService.insert(body);
}
// thêm dữ liệu điểm cao khi tạo tk ms
exports.insetPointUser = async (id) => {

    let map = await mapService.getMaps();
    for (let index = 0; index < map.length; index++) {
        for (let i = 0; i < 2; i++) {
            const highPoint = {
                user_id: id,
                map_id: map[index]._id,
                point: 0,
                level: i+1,
            }
            console.log(highPoint)
            await pointService.insert(highPoint);
        }
    }
}
exports.getHightPointUser = async (user_id) => {
    let point = await pointService.getHightPointUser(user_id);

    const arrPont = [];
    point = point.map((item, index) => {
        const a = point[index]
        arrPont.push(a.point);
        return item;
    })
    return arrPont;
}

exports.updatePointUser = async (user_id, map_id2, level, point) => {
    console.log(user_id + "----" + map_id2 + "----" + point + "----" + level + "----");
    let map = await mapService.getOneMap2(map_id2);
    let map_id = map._id;
    console.log( "Da chay >>>>>>>>>>>>>" + map._id);
    let result = await pointService.updatePoint(user_id, map_id, level, point);
    return result;
}

exports.getUser = async (id) => {
    let user = await userService.getUserById(id);
    user = {
        username: user.username,
        image: user.image
    }
    return user;
}
exports.getMap = async (id) => {
    let map = await mapService.getOneMap2(id);
    map = {
        name: map.name,
        image: map.image
    }
    // console.log("Id: " + id + "map: " + map.name);
    return map;
}



// lấy dữ liệu user theo level
exports.getHightPointLevel = async (level) => {
    let point = await pointService.getHightPointLevel(level);
        point = point.map((item, index) =>  {
            user = item.user_id;
            map = item.map_id;
            try {
                item = {
                    username: user.name,
                    image: user.image,
                    map: map.name,
                    point: item.point,
                    index: index + 1
                }
                return item;
            } catch (error) {
                console.log(">>>>>"+ item)
            }
            
        })
    return point;
}
