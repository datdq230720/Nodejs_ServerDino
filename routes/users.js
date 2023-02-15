var express = require('express');
var flash = require('connect-flash');
var router = express.Router();
router.use(flash());
const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const nodemailer = require("nodemailer");
const authentication = require('../components/middle/authentication');
const pointController = require('../components/high_point/controller');
const ConversionController = require('../components/currency_conversion/controller');
const CharacterController = require('../components/character/controller');
const WeaponController = require('../components/weapons/controller');
const MonterController = require('../components/monter/controller');
const MapController = require('../components/map/controller');
const HistoryController = require('../components/history/controller');
const ReceiptController = require('../components/receipt/controller');

const myAchivementController = require('../components/my_achievement/controller');
const achivementController = require('../components/achivement/controller');

// Render trang đăng ký user
router.get('/register-user', function (req, res, next) {
  res.render('register-user', { layout: 'layout/login_register', messages: req.flash('checkRegister') });
});

router.get('/user/error', function (req, res, next) {
  res.render('error_user', { layout: 'layout/error/layout_error' });
});

router.get('/error', function (req, res, next) {
  res.render('error', { layout: 'layout/error/layout_error' });
});


router.get('/check-user', async function (req, res, next) {
  res.render('checkUser', { layout: 'layout/mail/sendMail-layout', messages: req.flash('checkEmail'), check: req.flash('check') });
});


// Thực hiện đăng ký user
router.post('/check-user', async function (req, res, next) {
  const { username } = req.body;
  const user = await userController.checkUser(username);
  if (!user) {
    req.flash('checkEmail', 'Tên tài khoản không tồn tại, xin bạn hãy kiểm tra lại!')
    return res.redirect('/check-user')
  }
  if (!user.email) {
    req.flash('check', 'Tài khoản chưa được liên kết với gmail!')
    return res.redirect('/check-user')
  }
  else {
    var email = user.email;
  }

  global.user_id = user._id;
  var user_id = global.user_id;
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
    subject: 'RESET PASSWORD FOR DINO ADVENTURE ', // Subject line
    text: 'Enter Body of message', // plain text body
    html: `<p><b>Xin chào</b> bạn <img src="cid:note@example.com"/></p>
        <p>This is the link to change the password</p>
        <a href="http://localhost:3000/user/forgot-password"><p>Please Click here</p></a>
        <p>Thank you for coming to DINO ADVENTURE<br/></br><p><img style="width:500px;height:500px;" src="https://i.imgur.com/cliTgkO.png"/></p></p>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.redirect('/check-user');
    }
    req.flash('sendMail', `Sent to gmail ${email}, please check your inbox!`)
    return res.redirect('/login-user');
  });
});

router.get('/user/check-password', [authentication.checkLogin], async function (req, res, next) {
  var update = global.update;
  const user = await userController.getUsersById(update);
  res.render('check-password', { layout: 'layout/mail/sendMail-layout', user: user, checkPassword: req.flash('checkPassword') });
});

router.post('/user/check-password', [authentication.checkLogin], async function (req, res, next) {
  const { password } = req.body;
  const user = await userController.checkPassword(password);
  if (user) {
    res.redirect(`/user/change-your-password`);
  } else {
    req.flash('checkPassword', 'Password is incorrect, please check again!')
    res.redirect(`/user/check-password`);
  }
});

//thay đổi mật khẩu
router.get('/user/change-your-password', [authentication.checkLogin], async function (req, res, next) {
  res.render('change-your-password', { layout: 'layout/mail/sendMail-layout' });
});

router.post('/user/change-your-password', [authentication.checkLogin], async function (req, res, next) {
  //thay đổi mật khẩu
  var update = global.update;
  const user = await userController.getUsersById(update);
  const token = jwt.sign({ id: user._id, username: user.username }, 'token')
  req.session.token = token;
  let { body, params } = req;
  body = { ...body }
  await userController.change(params.id, body);
  let result_history = await HistoryController.insert(user._id, "Change Password");
  console.log("Lịch sử hoạt động: " + result_history);
  res.redirect(`/user`);
});

//quên mật khẩu
router.get('/user/forgot-password', async function (req, res, next) {
  res.render('forgot-password', { layout: 'layout/mail/sendMail-layout' });
});

router.post('/user/forgot-password', async function (req, res, next) {
  //quên mật khẩu
  var user_id = global.user_id;
  const user = await userController.getUsersById(user_id);

  const token = jwt.sign({ id: user_id, username: user.username }, 'token')
  req.session.token = token;
  console.log(">>>>>>: " + token);
  let { body, params } = req;
  body = { ...body }
  await userController.forgot(params.id, body);
  res.redirect(`/log-out`);
});


// Thực hiện đăng ký user
router.post('/register-user', async function (req, res, next) {
  const { username, password, confirm_password, name } = req.body;
  const user = await userController.register(username, password, confirm_password, name);
  if (user) {
    await pointController.insetPointUser(user._id);
    let result_achivement = await myAchivementController.insert(user._id);
    let result_history = await HistoryController.insert(user._id, "Sign up for an account");
    console.log("Lịch sử hoạt động: " + result_history+ " Thêm thành tựu: " + result_achivement);
    req.flash('Login', 'Successful account registration, log in!')
    res.redirect('login-user');
  } else {
    req.flash('checkRegister', 'Account registration failed, the account is already in use!')
    res.redirect('register-user');
  }
});

// Render trang chi tiết user
router.get('/user', [authentication.checkLogin], async function (req, res, next) {
  // lấy thông tin chi tiết 1 user
  var update = global.update;
  console.log("/user :" + update);
  const user = await userController.getUsersById(update);
  let characters = await userController.getCharacterUser(user._id, user.points);
  let weapons = await userController.getWeaponUser(user._id);
  let myachievement = await myAchivementController.getAllAchievement2(user._id);

  if (user.email.length == 0) {
    user.email = "Link account with google";
  } else { }
  res.render('index', { layout: 'layout/layout_index', user: user, checkGmail: req.flash('checkGmail'),
   characters: characters, weapons: weapons, myachievement: myachievement });
});

// Render trang đăng nhập user
router.get('/login-user', function (req, res, next) {
  res.render('login-user', { layout: 'layout/login_register', messages: req.flash('checkLogin'), login: req.flash('Login'), sendMail: req.flash('sendMail') });
});

// Thực hiện đăng nhập user
router.post('/login-user', [authentication.checkLogin], async function (req, res, next) {
  const { username, password } = req.body;
  //thực hiện kiểm tra đăng nhập
  const result = await userController.login(username, password);

  if (result) {
    // secret key 
    global.update = result._id;
    global.user = result;
    const token = jwt.sign({ id: result._id, username: result.username }, 'token')
    req.session.token = token;
    //nếu đúng chuyển qua list users

    let result_history = await HistoryController.insert(user._id, "Web login");
    console.log("Lịch sử hoạt động: " + result_history);

    res.redirect('/user');

    global.check = result.username;
  } else {
    //nếu sai thì quay trở lại đăng nhập
    req.flash('checkLogin', 'Incorrect account or password!')
    res.redirect('login-user');
  }
});

router.get('/xep-hang', [authentication.checkLogin], async function (req, res, next) {
  var update = global.update;
  const user = await userController.getUsersById(update);
  const top = await userController.getTopPoint();
  const lv1 = await pointController.getHightPointLevel(1);
  const lv2 = await pointController.getHightPointLevel(2);
  res.render('xep-hang', { layout: 'layout/layout_index', user: user, top: top, lv1: lv1, lv2: lv2 });
});
router.get('/thu-vien', [authentication.checkLogin], async function (req, res, next) {
  var update = global.update;
  const user = await userController.getUsersById(update);
  const monters = await MonterController.getAllMonter();
  const maps = await MapController.getMaps();
  const characters = await CharacterController.getAllCharacter();
  const weapons = await WeaponController.getAllWeapon();
  res.render('thu-vien', { layout: 'layout/layout_index', user: user, maps: maps, monters: monters, weapons: weapons, characters: characters });
});
router.get('/history/:loai', [authentication.checkLogin], async function (req, res, next) {
  var update = global.update;

  let loai = req.params.loai;
  const user = await userController.getUsersById(update);
  console.log(update)
  const history = await HistoryController.getHistoryByUser(update);
  const receipt = await ReceiptController.getReceiptByUser(update);
  res.render('ho-tro', { layout: 'layout/layout_index', user: user, history: history, receipt: receipt, loai: loai});
});
router.get('/nap-the', [authentication.checkLogin], async function (req, res, next) {
  var update = global.update;
  const exchangeMoney = await ConversionController.getCurrencyConversion();
  // console.log(exchangeMoney);
  const user = await userController.getUsersById(update);
  res.render('nap-the', { layout: 'layout/layout_index', user: user, exchangeMoney: exchangeMoney });
});

router.post('/nap-the', async function (req, res, next) {
  const { price, amount } = req.body;
  await userController.payMomo(amount);
  // const exchangeMoney = await ConversionController.getCurrencyConversion();
  // res.render('nap-the', { layout: 'layout/layout_index', exchangeMoney: exchangeMoney });
  res.redirect('/nap-the');
});

// router.get('/nap-the', [authentication.checkLogin], async function (req, res, next) {
//   res.render('nap-the', { layout: 'layout/layout_index' });
// });

let count = "0";
router.get('/returnMomo/', async function (req, res, next) {
  const count2 = req.url;
  try {
    const querystring = require('querystring');
    var id = global.update;
    const url = querystring.parse(req.url + "");
    const user = await userController.getUsersById(id);
    console.log(url);
    if (count2 == "'/returnMomo': ''") {
      // res.render('returnMomo');
    } else if (count != count2) {
      // thêm tiền vào tk
      const exchangeMoney = await ConversionController.exchangeMoney(url.amount);
      console.log("exchangeMoney: " + exchangeMoney);
      user.price = Number(exchangeMoney) + Number(user.price);
      console.log(user.price + "amount: " + url.amount + " price: " + user.price);
      await userController.updatePrice(user._id, user.price);
      // result = "Đã mua vật phẩm thành công";
      let receipt = {
        user_id: user._id,
        price: url.amount,
        coin: exchangeMoney,
      }
      const result_receipt = await ReceiptController.insert(receipt);
      let result_history = await HistoryController.insert(user._id, "Conduct transaction");
      console.log(result_receipt + " Lịch sử hoạt động: " + result_history);
      count = count2;
    } else if (count == count2) {
      console.log("Transaction error");
      return false;
    }
    res.redirect('/user');
    // res.render('returnMomo', { amount: url.amount });
  } catch (error) {
    // const monters = await MonterController.getAllMonter();
    // res.render('returnMomo', {monters: monters });
    res.redirect('/user');
  }

});


// Đăng xuất user
router.get('/log-out', function (req, res, next) {
  req.session.destroy(function (err) {
    global.update = "";
    global.check = "";
    var update = global.update;
    var check = global.check;
    console.log(">>>>>>>>>" + update, check);
    // nếu đăng xuất thành công thì chuyển qua đăng nhập user
    res.redirect('login-user');
  })
});


// Đăng xuất admin
router.get('/log-out-admin', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('login-admin');
  })
});
// Nạp tiền vào tài khoản
module.exports = router;
