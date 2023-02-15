var express = require("express");
var router = express.Router();
var flash = require("connect-flash");
router.use(flash());
const authentication = require("../../components/middle/authentication");
const upload = require("../../components/middle/upload");
const mapController = require("../../components/map/controller");

router.get("/", [authentication.checkAdmin], async function (req, res, next) {
  const map = await mapController.getMaps();
  res.render("admin/map/index", { map: map, layout: "layout/admin/index" });
});

router.get(
  "/information/:id/profile",
  [authentication.checkAdmin],
  async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const { id } = req.params;
    const map = await mapController.getOneMapById(id);
    res.render("admin/map/profile", { layout: "layout/admin/index", map: map });
  }
);

router.get(
  "/information/:id/edit",
  [authentication.checkAdmin],
  async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const { id } = req.params;
    const map = await mapController.getOneMapById(id);
    res.render("admin/map/edit", { layout: "layout/admin/index", map: map });
  }
);

router.post(
  "/information/:id/post",
  [upload.single("image"), authentication.checkAdmin],
  async function (req, res, next) {
    //cap nhat thong tin chi tiet 1 san pham
    const { id } = req.params;
    const map = await mapController.getOneMapById(id);
    let { body, file, params } = req;
    delete body.image;
    let image = map.image;
    if (file) {
      image = `/images/img_product/${file.filename}`;
    }
    body = { ...body, image: image };
    await mapController.editMap(params.id, body);
    res.redirect("/admin/map");
  }
);

router.get('/create',[authentication.checkAdmin], async function (req, res, next) {
  res.render('admin/map/create',{layout:'layout/admin/layout_add_product'});
});

router.post('/post',[upload.single('image'),authentication.checkAdmin],async function (req, res, next) {
  let{body, file} = req;
  let image = '';
  if(file){
     image = `/images/img_product/${file.filename}`
  }
  body = {...body, image: image}
  await mapController.insertMap(body);
  res.redirect('/admin/map');
});

router.post("/:id/hidden", async function (req, res, next) {
  console.log('ok')
  const { id } = req.params;
  await mapController.hidden(id);
  res.json({ result: true });
});

router.post("/:id/unhidden", async function (req, res, next) {
  const { id } = req.params;
  await mapController.unHidden(id);
  res.json({ result: true });
});

module.exports = router;
