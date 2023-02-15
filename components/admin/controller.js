// tầng giao tiếp và xử lý data
const adminService = require('./service');
const bcrypt = require('bcryptjs'); 

//Login Admin Controller
exports.login = async(username,password) =>{
    const user = await adminService.login(username);
    if(!user){return null}
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword) return null;
    return{_id: user._id,username:user.username}
}

// Register Admin Controller
exports.register = async (username,password,confirm_password) =>{
    if(password != confirm_password)return null;
    let user = await adminService.login(username);
    if(user) return null;
    if(username.length <6 || password != confirm_password || password.length <6 || confirm_password.length <6) return null;
    const hash = await bcrypt.hash(password,await bcrypt.genSalt(10))
    user = await adminService.register(username,hash);
    return{ _id: user._id}
}

// Lấy thông tin của admin
exports.getAdminById = async (id) => {
    let admin = await adminService.getAdminById(id);
    admin = {
      _id: admin._id,
      username: admin.username,
      name: admin.name,
      googleId: admin.googleId,
      email: admin.email,
      image: admin.image,
      phone: admin.phone,
      password: admin.password,
      address: admin.address,
      CMND: admin.CMND,
      age: admin.age,
      birthday: admin.birthday,
      sex: admin.sex,
      description: admin.description,
      created_at: admin.created_at,
      update_at: admin.update_at,
    }
    return admin;
  }


  exports.editProfile = async (id, admin) => {
    await adminService.editProfile(id, admin);
    return { _id: admin._id, name: admin.name };
  }

// Kiểm tra mật khẩu cũ trước khi cho đổi mật khẩu
exports.checkPassword = async (password) => {
  var check = global.check;
  const admin = await adminService.login(check);
  if (!admin) { return null }
  const checkPassword = await bcrypt.compare(password, admin.password);
  if (!checkPassword) return null;
  return { _id: admin._id, name: admin.name}
}

// Đổi mật khẩu của một admin
exports.change = async (id, admin) => {
  const hash = await bcrypt.hash(admin.password, await bcrypt.genSalt(10))
  await adminService.change(id, admin, admin.password = hash);
  return { _id: admin._id, password: admin.password };
}

// Kiểm tra admin có tồn tại hay không nếu tồn tại sẽ gửi gmail
exports.checkAdmin = async (username, _id, email) => {
  let admin = await adminService.checkAdmin(username);
  if (!admin) return null;
  admin = await adminService.sendAdmin(username, _id, email);
  return { _id: admin._id, email: admin.email }
}

// Quên mật khẩu của một admin
exports.forgot = async (id, admin) => {
  const hash = await bcrypt.hash(admin.password, await bcrypt.genSalt(10))
  await adminService.forgot(id, admin, admin.password = hash);
  return { _id: admin._id, password: admin.password };
}