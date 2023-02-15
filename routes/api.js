var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


const userController = require('../components/users/controller');
const adminController = require('../components/admin/controller');
const productController = require('../components/product/controller');
const categoryController = require('../components/categories/controller');
const buyController = require('../components/buy_character/controller');
const mapController = require('../components/map/controller');
const pointController = require('../components/high_point/controller');
const character = require('../components/character/controller');
const myAchivement = require('../components/my_achievement/controller');
const receiptController = require('../components/receipt/controller');
const weapons = require('../components/weapons/controller');
const HistoryController = require('../components/history/controller');
const achivementController = require('../components/achivement/controller');

const ReceiptController = require('../components/receipt/controller');


const ConversionController = require('../components/currency_conversion/controller');

const { response } = require('express');
const nodemailer = require("nodemailer");
const userModel = require('../components/users/model');

///
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Đăng nhập admin api
router.post('/login-admin', async function (req, res, next) {
  const { username, password } = req.body;
  //thực hiện kiểm tra đăng nhập
  const user = await adminController.login(username, password);
  console.log(req);
  if (user) {
    // secret key 
    const token = jwt.sign({ id: user._id, username: user.username }, 'token')
    res.json({ status: true, id: user._id, username: user.username, token })
  } else {
    res.json({ status: false })
  }

});

//Đăng nhập user api
router.post('/check-name', async function (req, res, next) {
  const { name } = req.body;
  //thực hiện kiểm tra đăng nhập
  const user = await userController.checkName(name);
  if (user) {
    res.json({ status: false })
  } else {
    res.json({ status: true });
  }
});

router.post('/update/name', async function (req, res, next) {
  const { user_id, name, price } = req.body;
  var id = user_id;
  //thực hiện kiểm tra đăng nhập
  const check = await userController.checkName(name);
  const user = await userController.getUsersById(id);
  user.name = name;
  user.price -= price;
  await userController.updatePrice(user._id, user.price);
  await userController.updateName(user._id, user);
  if (check) {
    res.json({ status: false })
  } else {
    res.json({ status: true });
  }
});

//Đăng nhập user api
router.post('/login-user', async function (req, res, next) {
  const { username, password } = req.body;
  //thực hiện kiểm tra đăng nhập
  const user = await userController.login(username, password);
  if (user) {
    let result_history = await HistoryController.insert(user._id, "Đăng nhập vô game");
    console.log("Lịch sử hoạt động: " + result_history);
    const token = jwt.sign({ id: user._id, name: user.name, price: user.price, points: user.points, image: user.image }, 'token')
    res.json({ status: true, id: user._id, name: user.name, price: user.price, points: user.points, image: user.image, token })
  } else {
    res.json({ status: false });
  }
});


// gửi mail cho user api
router.post('/sendMail', async function (req, res, next) {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thuanvv17072002@gmail.com", // generated ethereal user
      pass: "ozfrilsabrizhhss"// generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "thuanvv17072002@gmail.com", // sender address
    to: email, // list of receivers
    subject: 'RESET PASSWORD FOR DINO ADVENTURE', // Subject line
    text: 'Enter Body of message', // plain text body
    html: "<a><a href='http://localhost:3000/login-user'>Click to reset password</a></a>", // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.json({
        message: "Failed to send mail",
        err,
      })
    }
    return res.json({
      message: `Send mail successfully for ${email}`,
    });
  });
});

// Đăng ký user api
router.post('/dang-ky', async function (req, res, next) {
  const { username, password, confirm_password, name } = req.body;
  //tien hanh dang ky
  const user = await userController.register(username, password, confirm_password, name);
  var strEmail = new String(username);
  var strPassword = new String(password);
  if (user && strEmail.length >= 6 && strPassword.length >= 6) {
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }
});

// Đăng ký admin api
router.post('/register-admin', async function (req, res, next) {
  const { username, password, confirm_password } = req.body;
  //tien hanh dang ky
  const user = await adminController.register(username, password, confirm_password);
  if (user) {
    res.json({ status: true })
    console.log(username, password);
  } else {
    res.json({ status: false })
    console.log(username, password);
  }
});

// Cập nhật user
router.post('/:id/edit', async function (req, res, next) {
  //cap nhat thong tin chi tiet 1 san pham
  let { body, params } = req;
  body = { ...body }
  const users = await userController.update(params.id, body);
  if (users) {
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }
});


// Cập nhật user
router.post('/:id/forgotPassword', async function (req, res, next) {
  //cap nhat thong tin chi tiet 1 san pham
  let { body, params } = req;
  body = { ...body }
  const users = await userController.forgot(params.id, body);
  console.log(">>pw: " + users.password)
  if (users && users.password) {
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }

});

router.get('/user', [], async function (req, res, next) {
  const users = await userController.getUsers();
  console.log('>>>>>>>>>>>', users);
  res.json(users);
});


//http://localhost:3000/api/products/:id/detail
//thêm middle kiểm tra login
//khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/register-user/:id/detail', async function (req, res, next) {
  const { id } = req.params
  const user = await userController.getUserById(id);
  console.log(user);
  res.json(user);
});


//http://localhost:3000/api/products
//thêm middle kiểm tra login
//khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/san-pham', [], async function (req, res, next) {
  const products = await productController.getProducts();
  console.log('>>>>>>>>>>>', products);
  res.json(products);
});


router.get('/category', [], async function (req, res, next) {
  const categories = await categoryController.getCategories();
  console.log('>>>>>>>>>>>', categories);
  res.json(categories);
});


// --------------------------------------------------------------------



// Mua vật phẩm + trừ tiền người chơi
// http://localhost:3000/api/reset-price
router.post('/reset-price', async function (req, res, next) {
  const { user_id, code, price } = req.body;
  let result = "Mua vật phẩm";
  const id = user_id;
  // console.log('>>>>>>>>>mã trang phục: ' + code);
  const user = await userController.getUsersById(id);

  if (price > user.price) {
    result = "Số tiền của bạn không đủ để mua: " + user.price;
    // console.log('>>>>>>>>>by-item err: ' + result);
    result = false;
  } else {
    user.price -= price;
    // console.log('by-item price: ' + user.price);
    await userController.updatePrice(user._id, user.price);
    await buyController.insert(req.body)
    result = true;
  }
  if (result == true) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }

});
// Thêm tiền vào user
// http://localhost:3000/api/add-price
router.post('/add-price', async function (req, res, next) {
  const { user_id, price } = req.body;
  let result = false;
  const id = user_id;
  console.log('>>>>>>>>>by-item err: ' + id);
  const user = await userController.getUsersById(id);
  if (user) {
    user.price += Number(price);
    console.log('by-item price: ' + JSON.stringify(user));
    await userController.updatePrice(user._id, user.price);
    result = true;
  }
  if (result == true) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }

});

// lấy danh sách điểm của user 
// http://localhost:3000/api/point-user/:id/get
router.get('/point-user/:id/get', async function (req, res, next) {
  const { id } = req.params;
  const point = await pointController.getHightPointUser(id);
  // console.log('>>>>>>>>>>>', point);
  res.json({ point: point });
});
// lưu điểm cao map của user lên 
// http://localhost:3000/api/point-user/save
router.post('/point-user/save', async function (req, res, next) {
  let body = req.body;
  const { user_id, map_id, point, level } = body;
  // console.log(user_id + "----" + map_id + "----" + point + "----" + level + "----");
  const result = await pointController.updatePointUser(user_id, map_id, level, point);
  console.log(result);
  if (result == true) {
    res.json({ status: true });
  } else { res.json({ status: false }); }

});

// lấy danh sách điểm cần để mở khóa Weapons
// http://localhost:3000/api/open-weapons
router.get('/open-weapons', async function (req, res, next) {
  // const open = await openWeapons.getOpenWeapons();
  const open = await weapons.getPointWeapon();
  res.json({ open: open });
});
// Lấy danh sách vật phẩm character
// http://localhost:3000/api/character-user/:id/get
router.get('/character-user/:id/get', async function (req, res, next) {
  const { id } = req.params;
  let user_id = id;
  const data = await buyController.getIdProductGame(user_id);
  res.json({ data: data });
});
// lấy giá tiền cho trang phục
// http://localhost:3000/api/price-character
router.get('/price-character', async function (req, res, next) {
  const arrPrice = await character.getPriceCharacter();
  res.json({ arrPrice: arrPrice });
});
// lấy điểm để mở trang phục
// http://localhost:3000/api/get-character
router.get('/get-character', async function (req, res, next) {
  const arrPrice = await character.getPointCharacter();
  res.json({ open: arrPrice });
});
// lấy thành tự của người chơi
// http://localhost:3000/api/my-achievement/:id
router.get('/my-achievement/:id', async function (req, res, next) {
  let user_id = req.params.id;
  const achievement = await myAchivement.getAllAchievement(user_id);
  res.json({ achievement: achievement });
});

// lấy tên map
// http://localhost:3000/api/name-map
router.get('/name-map', async function (req, res, next) {
  const map = await mapController.getMapName();
  res.json({ map: map });
});

// cập nhật thành tự của người chơi
// http://localhost:3000/api/my-achievement/update
router.post('/my-achievement/update', async function (req, res, next) {
  let { _id, achieved, rewarded } = req.body;
  // _id là id của thành tựu
  const achievement = await myAchivement.getOneAchievement(_id);
  if (achieved == "true") {
    achieved = true;
  } else {
    console.log(achieved);
    achieved = false;
  }
  if (rewarded == "true") {
    rewarded = true;
  } else {
    console.log(rewarded);
    rewarded = false;
  }
  achievement.achieved = achieved;
  if (achieved == true) {
    achievement.date = new Date();
  }
  achievement.rewarded = rewarded;

  const status = await myAchivement.update(_id, achievement);
  res.json({ status: status });
});


// Test cho web
// http://localhost:3000/api/test-all
router.get('/test-all/:id', async function (req, res, next) {
  req = req.
    // const open = await question.getAllAchievement();
    body = {
    user_id: "635cb3ca3ea8aefc78541072",
    price: 10000,
    coin: 20
  };
  let receipt = {
    user_id: "636cd17b11786ac4c1538b28",
    price: 10000,
    coin: 20,
  }
  // const open = await ReceiptController.insert(receipt);
  const open = await receiptController.getReceiptPriceByUser("63733ee94550607127d759eb");
  // const open = await achivementController.getAllAchievement();
  // const open = await myAchivement.getAllAchievement("636b5941c473cd50aa8757b7");
  res.json({ open: open });
});
router.post('/test-all/add', async function (req, res, next) {

  // const open = await question.getAllAchievement();
  let data = req.body;
  // let data2 = {
  //   _id: "6348e839fc13ae0e32000050",
  //   name: "sở hữu trang phục",
  //   countNow: 3,
  //   countFinish: {
  //     m1: 3,
  //     m2: 5,
  //     m3: 7,
  //   },
  //   reward: {
  //     m1: 5,
  //     m2: 10,
  //     m3: 15,
  //   },
  //   finished: 1,
  //   user_id: "6348ea29a21531a304a6dada"
  // };
  const open = await myAchivement.getAllAchievement("63733ee94550607127d759eb");
  res.json({ status: open });
});

module.exports = router;