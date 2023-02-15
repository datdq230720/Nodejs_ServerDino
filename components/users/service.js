// tầng giao tiếp với database
const userModel = require('./model');

//Lấy danh sách user
exports.getUsers = async () => {
    const user = await userModel.find();
    return user;
}

//Kiểm tra tài khoản google đã được liên kết chưa nếu đã liên kết thì không cho liên kết nữa 
exports.getUsersGGID = async (googleId) => {
    try {
        const user = await userModel.findOne({ googleId: googleId }, 'googleId');
        return user;
    } catch (e) {
        return e;
    }
}

// Kiểm tra username đã tồn tại hay không
exports.login = async (username) => {
    const user = userModel.findOne({ username: username});
    return user;
}

// Kiểm tra user đã có trong db hay chưa
exports.checkUser = async (username) => {
    const user = userModel.findOne({ username: username});
    return user;
}

//Nếu kiể tra có tồn tại thì gửi gmail
exports.sendUser = async (username) => {
    const user = userModel.findOne({ username: username});
    return user;
}

// Kiểm tra tên đăng nhập đã tồn tại
exports.checkName = async (name) => {
    const user = userModel.findOne({ name: name, }, 'id username password name price points');
    return user;
}


// Đăng ký tài khoản
exports.register = async (username, password, name, points) => {
    const user = new userModel({ username, password, name, points });
    return await user.save();

}

// Cập nhật user
exports.update = async (id, user) => {
    await userModel.findByIdAndUpdate(id, user);
    return user;
}

// Cập nhật name user
exports.updateName = async (id, user,name) => {
    await userModel.findByIdAndUpdate(id,user);
    return user;
}

// Đổi mật khẩu của một user
exports.change = async (id, user) => {
    var update = global.update;
    await userModel.findByIdAndUpdate(update, user);
}


// Quên mật khẩu của một user
exports.forgot = async (id, user) => {
    var user_id = global.user_id;
    await userModel.findByIdAndUpdate(user_id, user);
}

// Cập nhật price cho user
exports.updatePrice = async (id, price) => {
    const user = await userModel.findById(id);
    user.price = price;    
    await userModel.findByIdAndUpdate(id, user);
    
}

// Lấy thông tin user
exports.getUsersById = async (id) => {
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        return null;
    }
    
}

//Xóa một user
exports.delete = async (id) => {
    await userModel.findByIdAndDelete(id);
}

// Chặn một tài khoản user
exports.ban = async (id,status) => {
    var status = false;
    const user = await userModel.findById(id);
    user.status = status;   
    await userModel.findByIdAndUpdate(id, user);
    return user;
}

//Hủy chặn một tài khoản user
exports.resetUser = async (id,status) => {
    var status = true;
    const user = await userModel.findById(id);
    user.status = status;   
    await userModel.findByIdAndUpdate(id, user);
    return user;
}

// danh sách 10 người chơi có điểm cao nhất
exports.getTopPoint = async () => {
    const user = await userModel.find({ points: {$gt: 0}}).sort('-points').limit(10);
    // console.log(user);
    return user;
}

exports.getUserById = async (id) => {
    const user = await userModel.findById(id);
    // console.log("1----"+user+"----");
    return user;
}

// danh sách 20 người chơi có tỉ lệ nạp thẻ cao nhất
exports.getTopPrice = async () => {
    const user = await userModel.find({price: {$gt: 0}}).sort('-price').limit(20);
    return user;
}

exports.getAllPrice = async () => {
    const user = await userModel.find();
    return user;
}

exports.getPrice = async (price) => {
    const data = await userModel.find(price);
    return data;
}






