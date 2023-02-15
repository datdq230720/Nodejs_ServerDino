const userService = require("./service");
const MoMo = require("../pay_momo/QR");
const characterServer = require("../character/service");
const buyServer = require("../buy_character/service");
const pointServer = require("../high_point/service");
const weaponServer = require("../weapons/service");
const bcrypt = require("bcryptjs");

// Lấy danh danh sách user
exports.getUsers = async () => {
  let data = await userService.getUsers();
  data = data.map((item) => {
    item = {
      _id: item._id,
      username: item.username,
      points: item.points,
      name: item.name,
      email: item.email,
      image: item.image,
      price: item.price,
      Date: item.Date.toDateString(),
      status: item.status,
    };
    return item;
  });
  return data;
};

// Lấy thông tin của 1 user
exports.getUsersById = async (id) => {
  let user = await userService.getUsersById(id);
  // user = {
  //   _id: user._id,
  //   username: user.username,
  //   name: user.name,
  //   price: user.price,
  //   password: user.password,
  //   image: user.image,
  //   email: user.email,
  //   points: user.points,
  //   Date: user.Date,
  //   datename: user.datename,
  //   status: user.status,
  // }
  return user;
};

// Đăng nhập user
exports.login = async (username, password) => {
  const user = await userService.login(username);
  if (!user || user.status == false) {
    return null;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return null;
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    price: user.price,
    points: user.points,
    image: user.image,
  };
};

// Kiểm tra mật khẩu cũ trước khi cho đổi mật khẩu
exports.checkPassword = async (password) => {
  var check = global.check;
  const user = await userService.login(check);
  if (!user) {
    return null;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return null;
  return {
    _id: user._id,
    name: user.name,
    price: user.price,
    points: user.points,
  };
};

// Đăng ký user
exports.register = async (username, password, confirm_password, name) => {
  if (password != confirm_password) return null;
  let user = await userService.login(username);
  if (user) return null;
  if (
    username.length < 6 ||
    password != confirm_password ||
    password.length < 6 ||
    confirm_password.length < 6
  )
    return null;
  const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
  user = await userService.register(username, hash, name);
  return { _id: user._id };
};

// Kiểm tra user có tồn tại hay không nếu tồn tại sẽ gửi gmail
exports.checkUser = async (username, _id, email) => {
  let user = await userService.checkUser(username);
  if (!user) return null;
  user = await userService.sendUser(username, _id, email);
  return { _id: user._id, email: user.email };
};

// Check email user
exports.CheckEmail = async (username) => {
  let user = await userService.login(username);
  if (user) return null;
  user = await userService.register(username);
  return { _id: user._id };
};

// Cập nhật thông tin của 1 user
exports.update = async (id, user) => {
  await userService.update(id, user);
  return { _id: user._id, name: user.name };
};

// Cập nhật thông tin name của 1 user
exports.updateName = async (id,user) => {
  var check = await userService.checkName(user.name);
  if (check) return null;
  await userService.updateName(id, user);
  return { _id: user._id, name: user.name };
};

exports.checkName = async (name) => {
  let user = await userService.checkName(name);
  if (!user) return null;
  return { user: user };
};

// Đổi mật khẩu của một user
exports.change = async (id, user) => {
  const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  await userService.change(id, user, (user.password = hash));
  return { _id: user._id, password: user.password };
};

// Quên mật khẩu của một user
exports.forgot = async (id, user) => {
  const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  await userService.forgot(id, user, (user.password = hash));
  return { _id: user._id, password: user.password };
};

//Xóa một tài khoản user
exports.delete = async (id) => {
  await userService.delete(id);
};

//Chặn một tài khoản user không cho login
exports.ban = async (id, user) => {
  await userService.ban(id, user);
};

//Hủy chặn một tài khoản user cho login lại
exports.resetUser = async (id, user) => {
  await userService.resetUser(id, user);
};

// cập nhật lại tiền của user
exports.updatePrice = async (id, _price) => {
  await userService.updatePrice(id, _price);
};
// lấy địa chỉ thanh toán momo
exports.payMomo = async (amount) => {
  // await MoMo.payQRMomo(amount);
  await MoMo.LinkMoMo(amount);
  return true;
};

// danh sách 10 người chơi có điểm cao nhất
exports.getTopPoint = async () => {
  let data = await userService.getTopPoint();
  data = data.map((item, index) => {
    // console.log("getTopPoint: "+item);
    item = {
      _id: item._id,
      username: item.name,
      points: item.points,
      image: item.image,
      index: index + 1,
    };
    return item;
  });
  return data;
};

// lấy tất cả trang phục user sở hữu
exports.getCharacterUser = async (id, points) => {
  let cPrice = await this.getCharacterPriceUser(id);
  let cPoint = await this.getCharacterPointUser(points);
  let data = [].concat(cPrice, cPoint);
  return data;
};

exports.getCharacterPriceUser = async (id) => {
  let data = await buyServer.getIdProductGame2(id);
  console.log(data);
  data = data.map((item, index) => {
    return item.product_id;
  });
  return data;
};
exports.getCharacterPointUser = async (points) => {
  let data = await characterServer.getPointCharacterLt(points);
  data = data.map((item, index) => {
    return item;
  });
  return data;
};

// lấy tất cả vũ khí user đã mở khóa
exports.getWeaponUser = async (id) => {
  let points = await pointServer.getOnePointUser(id);
  let data = await weaponServer.getUserWeapon(points.point);
  data = data.map((item, index) => {
    return item;
  });
  return data;
};

// danh sách 20 người chơi có tỉ lệ nạp thẻ nhiều nhất
exports.getTopPrice = async () => {
  let data = await userService.getTopPrice();
  data = data.map((item, index) => {
    item = {
      _id: item._id,
      username: item.username,
      price: item.price,
      name: item.name,
      image: item.image,
      index: index + 1,
    };
    return item;
  });
  return data;
};

exports.getAllPrice = async () => {
  let data = await userService.getTopPrice();
  data = data.map((item, index) => {
    item = {
      "price": item.price,
    };
    return item;
  });
  return data;
};

exports.getDate = async () => {
  let data = await userService.getUsers();
  data = data.map((item) => {
    item = {
      Date: item.Date.getMonth() + 1,
    };
    return item;
  });
  return data;
};

exports.getPrice = async () => {
  let data = await userService.getPrice();
  data = data.map((item) => {
    return item.price;
  });
  return data;
};
