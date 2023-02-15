// tầng giao tiếp với database
const adminModel = require('./model');

exports.login = async(username) =>{
    const user = adminModel.findOne({username : username},'id username password');
    return user;
}

exports.register = async(username,password) =>{
    const user = new adminModel({username,password});
    return await user.save();
}

// Lấy thông tin admin
exports.getAdminById = async (id) => {
    try {
        const admin = await adminModel.findById(id);
        return admin;
    } catch (error) {
        return null;
    }
}
exports.editProfile = async (id, admin) => {
    var admin_id = global.admin_id;
    console.log("server admin: "+admin.name);
    await adminModel.findByIdAndUpdate(admin_id,admin);
}

//Kiểm tra tài khoản google đã được liên kết chưa nếu đã liên kết thì không cho liên kết nữa 
exports.getAdminGGID = async (googleId) => {
    try {
        const admin = await adminModel.findOne({ googleId: googleId }, 'googleId');
        return admin;
    } catch (e) {
        return e;
    }
}

// Đổi mật khẩu của một admin
exports.change = async (id, admin) => {
    var admin_id = global.admin_id;
    await adminModel.findByIdAndUpdate(admin_id, admin);
}

// Kiểm tra user đã có trong db hay chưa
exports.checkAdmin = async (username) => {
    const admin = adminModel.findOne({ username: username});
    return admin;
}

//Nếu kiể tra có tồn tại thì gửi gmail
exports.sendAdmin = async (username) => {
    const admin = adminModel.findOne({ username: username});
    return admin;
}

// Quên mật khẩu của một admin
exports.forgot = async (id, admin) => {
    var admin_check = global.admin_check;
    await adminModel.findByIdAndUpdate(admin_check, admin);
}
