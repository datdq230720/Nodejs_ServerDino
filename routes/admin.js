var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const adminController = require("../components/admin/controller");
const userController = require("../components/users/controller");
const receiptController = require("../components/receipt/controller");
var flash = require("connect-flash");
router.use(flash());
const nodemailer = require("nodemailer");
const authentication = require("../components/middle/authentication");
const upload = require("../components/middle/upload");
const User = require("../components/users/model");

// Render trang đăng nhập admin
router.get("/login", function (req, res, next) {
  res.render("admin/login", { layout: "layout/login_register" });
});

router.get("/error", function (req, res, next) {
  res.render("error", { layout: "layout/layout_error" });
});

router.get("/User-error", function (req, res, next) {
  res.render("error_user", { layout: "layout/layout_error" });
});

// Render trang đăng nhập admin
router.get(
  "/dashboard",
  [authentication.checkAdmin],
  async function (req, res, next) {
    let result = "";
    const test = await receiptController.getReceiptPriceByUser();
    const topPrice = await receiptController.getTopReceiptPriceByUser();
    const data = await userController.getUsers();
    const getDate = await userController.getDate();
    const total_price = await receiptController.getPrice();
    const price = await receiptController.getAllPrice();

    console.log(topPrice)

    const sum = total_price.reduce(add, 0).toLocaleString("en");
    function add(accumulator, a) {
      return accumulator + a;
    }

    var total_users = data.length;

    const groupBy = data.reduce((group, product) => {
      const { Date } = product;
      group[Date] = group[Date] ?? [];
      group[Date].push(product);
      return group;
    }, {});

    const groupDate = getDate.reduce((group, date) => {
      const { Date } = date;
      group[Date] = group[Date] ?? [];
      group[Date].push(date);
      return group;
    }, {});

    const groupPrice = test.reduce((group, id) => {
      const Price  = id._id;
      group[Price] = group[Price] ?? [];
      group[Price].push(id);
      return group;
    }, {});

    date = new Date();

    DateNow = date.toDateString();

    if (groupBy[`${DateNow}`] == null) {
      day_users = 0;
    } else {
      day_users = groupBy[`${DateNow}`].length;
    }

    if (groupDate[1] == null) {
      month_1 = 0;
    } else {
      month_1 = groupDate[1].length;
    }

    if (groupDate[2] == null) {
      month_2 = 0;
    } else {
      month_2 = groupDate[2].length;
    }

    if (groupDate[3] == null) {
      month_3 = 0;
    } else {
      month_3 = groupDate[3].length;
    }

    if (groupDate[4] == null) {
      month_4 = 0;
    } else {
      month_4 = groupDate[4].length;
    }

    if (groupDate[5] == null) {
      month_5 = 0;
    } else {
      month_5 = groupDate[5].length;
    }

    if (groupDate[6] == null) {
      month_6 = 0;
    } else {
      month_6 = groupDate[6].length;
    }

    if (groupDate[7] == null) {
      month_7 = 0;
    } else {
      month_7 = groupDate[7].length;
    }

    if (groupDate[8] == null) {
      month_8 = 0;
    } else {
      month_8 = groupDate[8].length;
    }

    if (groupDate[9] == null) {
      month_9 = 0;
    } else {
      month_9 = groupDate[9].length;
    }

    if (groupDate[10] == null) {
      month_10 = 0;
    } else {
      month_10 = groupDate[10].length;
    }

    if (groupDate[11] == null) {
      month_11 = 0;
    } else {
      month_11 = groupDate[11].length;
    }

    if (groupDate[12] == null) {
      month_12 = 0;
    } else {
      month_12 = groupDate[12].length;
    }

    if (groupPrice[1] == null) {
      price_1 = 0;
    } else {
      price_1 = groupPrice[1][0].total_price;
    }

    if (groupPrice[2] == null) {
      price_2 = 0;
    } else {
      price_2 = groupPrice[2][0].total_price;
    }

    if (groupPrice[3] == null) {
      price_3 = 0;
    } else {
      price_3 = groupPrice[3][0].total_price;
    }

    if (groupPrice[4] == null) {
      price_4 = 0;
    } else {
      price_4 = groupPrice[4][0].total_price;
    }

    if (groupPrice[5] == null) {
      price_5 = 0;
    } else {
      price_5 = groupPrice[5][0].total_price;
    }

    if (groupPrice[6] == null) {
      price_6 = 0;
    } else {
      price_6 = groupPrice[6][0].total_price;
    }

    if (groupPrice[7] == null) {
      price_7 = 0;
    } else {
      price_7 = groupPrice[7][0].total_price;
    }

    if (groupPrice[8] == null) {
      price_8 = 0;
    } else {
      price_8 = groupPrice[8][0].total_price;
    }

    if (groupPrice[9] == null) {
      price_9 = 0;
    } else {
      price_9 = groupPrice[9][0].total_price;
    }

    if (groupPrice[10] == null) {
      price_10 = 0;
    } else {
      price_10 = groupPrice[10][0].total_price;
    }

    if (groupPrice[11] == null) {
      price_11 = 0;
    } else {
      price_11 = groupPrice[11][0].total_price;
    }

    if (groupPrice[12] == null) {
      price_12 = 0;
    } else {
      price_12 = groupPrice[12][0].total_price;
    }

    res.render("admin/dashboard", {
      layout: "layout/admin/index",
      top: topPrice,
      total_users: total_users,
      day_users: day_users,
      month_1: month_1,
      month_2: month_2,
      month_3: month_3,
      month_4: month_4,
      month_5: month_5,
      month_6: month_6,
      month_7: month_7,
      month_8: month_8,
      month_9: month_9,
      month_10: month_10,
      month_11: month_11,
      month_12: month_12,
      sum: sum,
      price_1: price_1,
      price_2: price_2,
      price_3: price_3,
      price_4: price_4,
      price_5: price_5,
      price_6: price_6,
      price_7: price_7,
      price_8: price_8,
      price_9: price_9,
      price_10: price_10,
      price_11: price_11,
      price_12: price_12,
    });
  }
);

// Thực hiện đăng nhập admin
router.post(
  "/login-admin",
  [authentication.checkAdmin],
  async function (req, res, next) {
    const { username, password } = req.body;
    //thực hiện kiểm tra đăng nhập
    const result = await adminController.login(username, password);
    if (result) {
      // secret key
      global.admin_id = result._id;
      const token = jwt.sign(
        { id: result._id, username: result.username },
        "token"
      );
      req.session.token = token;
      //nếu đúng chuyển qua list users
      res.redirect("dashboard");
      global.check = result.username;
    } else {
      //nếu sai thì quay trở lại đăng nhập
      res.redirect("login");
    }
  }
);

// Đăng xuất admin
router.get("/Log-out", function (req, res, next) {
  req.session.destroy(function (err) {
    global.update = "";
    var update = global.update;
    // nếu đăng xuất thành công thì chuyển qua đăng nhập
    res.redirect("login");
  });
});

// Render trang list user
router.get("/users/:page", [authentication.checkAdmin], (req, res, next) => {
  let perPage = 100; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1;
  User.find() // find tất cả các data
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, users) => {
      User.countDocuments((err, count) => {
        // đếm để tính có bao nhiêu trang
        if (err) return next(err);
        res.render("admin/users", {
          users, // sản phẩm trên một page
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage),
          layout: "layout/admin/index", // tổng số các page
        }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
      });
    });
});

// Render trang chi tiết user
router.get("/users/:id/edit", async function (req, res, next) {
  // lấy thông tin chi tiết 1 sản phẩm
  const { id } = req.params;
  const user = await userController.getUsersById(id);
  res.render("profile", { user: user });
});

router.post("/users/:id/ban", async function (req, res, next) {
  // xóa 1 sản phẩm khỏi database
  const { id } = req.params;
  await userController.ban(id);
  res.json({ result: true });
});

router.post("/users/:id/update", async function (req, res, next) {
  const { id } = req.params;
  console.log("user", id);
  await userController.resetUser(id);
  res.json({ result: true });
});

router.get(
  "/profile",
  [authentication.checkAdmin],
  async function (req, res, next) {
    // lấy thông tin chi tiết admin
    var admin_id = global.admin_id;
    const admin = await adminController.getAdminById(admin_id);
    res.render("admin/profile", { layout: "layout/admin/index", admin: admin });
  }
);

router.get(
  "/profile/edit",
  [authentication.checkAdmin],
  async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    var admin_id = global.admin_id;
    const admin = await adminController.getAdminById(admin_id);
    res.render("admin/edit_profile", {
      layout: "layout/admin/index",
      admin: admin,
    });
  }
);

router.post(
  "/profile/edit",
  [authentication.checkAdmin],
  async function (req, res, next) {
    //cap nhat thong tin chi tiet 1 san pham
    var admin_id = global.admin_id;
    const admin = await adminController.getAdminById(admin_id);
    let { body, params } = req;
    body = { ...body };
    await adminController.editProfile(params.id, body);
    console.log(">>>>>>>>> body : " + body.name);
    console.log(">>>>>>>>>: " + params.id);
    res.redirect("/admin/profile");
  }
);

router.get(
  "/profile/change-password",
  [authentication.checkAdmin],
  async function (req, res, next) {
    var admin_id = global.admin_id;
    const admin = await adminController.getAdminById(admin_id);
    res.render("admin/password/change_password", {
      layout: "layout/login_register",
      admin: admin,
    });
  }
);

router.post(
  "/profile/change-password",
  [authentication.checkAdmin],
  async function (req, res, next) {
    const { password } = req.body;
    const admin = await adminController.checkPassword(password);
    if (admin) {
      res.redirect(`/admin/profile/reset-password`);
    } else {
      res.redirect(`/admin/profile/change-password`);
    }
  }
);

router.get(
  "/profile/reset-password",
  [authentication.checkAdmin],
  async function (req, res, next) {
    res.render("admin/password/reset_password", {
      layout: "layout/login_register",
    });
  }
);

router.post(
  "/profile/reset-password",
  [authentication.checkAdmin],
  async function (req, res, next) {
    //thay đổi mật khẩu
    var admin_id = global.admin_id;
    const admin = await adminController.getAdminById(admin_id);
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      "token"
    );
    req.session.token = token;
    let { body, params } = req;
    body = { ...body };
    await adminController.change(params.id, body);
    res.redirect(`/admin/profile`);
  }
);

router.get("/check-account", async function (req, res, next) {
  res.render("admin/email/checkAdmin", {
    layout: "layout/login_register",
    messages: req.flash("checkEmail"),
    check: req.flash("check"),
  });
});

// Thực hiện đăng ký user
router.post("/check-account", async function (req, res, next) {
  const { username } = req.body;
  const admin = await adminController.checkAdmin(username);

  if (!admin) {
    req.flash(
      "checkEmail",
      "Tên tài khoản không tồn tại, xin bạn hãy kiểm tra lại!"
    );
    return res.redirect("/admin/check-account");
  }
  if (!admin.email) {
    req.flash("check", "Tài khoản chưa được liên kết với gmail!");
    return res.redirect("/admin/check-account");
  } else {
    var email = admin.email;
  }

  global.admin_check = admin._id;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thuanvv17072002@gmail.com", // generated ethereal user
      pass: "ozfrilsabrizhhss", // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "thuanvv17072002@gmail.com", // sender address
    to: email, // list of receivers
    subject: "RESET PASSWORD FOR DINO ADVENTURE ", // Subject line
    text: "Enter Body of message", // plain text body
    html: `<p><b>Xin chào</b> bạn <img src="cid:note@example.com"/></p>
        <p>Sau đây là đường dẫn thay đổi mật khẩu</p>
        <a href="http://localhost:3000/admin/forgot-password"><p>Xin hãy Click tại đây</p></a>
        <p>Cảm ơn các bạn đã đến với DINOADVENTURE<br/></br><p><img style="width:500px;height:500px;" src="https://i.imgur.com/cliTgkO.png"/></p></p>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.redirect("/check-account");
    }
    req.flash(
      "sendMail",
      `Đã gửi qua địa chỉ gmail ${email}, xin bạn hãy kiểm tra hòm thư!`
    );
    return res.redirect("/admin/login");
  });
});

//quên mật khẩu
router.get("/forgot-password", async function (req, res, next) {
  res.render("admin/password/forgot-password", {
    layout: "layout/login_register",
  });
});

router.post(
  "/forgot-password",
  [authentication.checkAdmin],
  async function (req, res, next) {
    //quên mật khẩu
    var admin_check = global.admin_check;
    const admin = await adminController.getAdminById(admin_check);
    const token = jwt.sign(
      { id: admin_check, username: admin.username },
      "token"
    );
    req.session.token = token;
    console.log(">>>>>>: " + token);
    let { body, params } = req;
    body = { ...body };
    await adminController.forgot(params.id, body);
    res.redirect(`/admin/Log-out`);
  }
);

module.exports = router;
