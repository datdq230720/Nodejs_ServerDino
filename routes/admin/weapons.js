var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
router.use(flash());

const authentication = require('../../components/middle/authentication');
const upload = require('../../components/middle/upload');

const weaponsController = require('../../components/weapons/controller');

router.get('/', [authentication.checkAdmin], async function (req, res, next) {
    const weapons = await weaponsController.getAllWeapon();
    res.render('admin/weapons/index', { weapons: weapons, layout: 'layout/admin/index' });
  });
  
  router.get('/information/:id/profile', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const weapons = await weaponsController.getByIdWeapon(id);
    res.render('admin/weapons/profile', {layout: 'layout/admin/index',weapons:weapons});
  });
  
  router.get('/information/:id/edit', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const weapons = await weaponsController.getByIdWeapon(id);
    res.render('admin/weapons/edit', {layout: 'layout/admin/index',weapons:weapons});
  });
  
  
  router.post('/information/:id/post',[upload.single('image'), authentication.checkAdmin],async function(req, res, next){
    //cap nhat thong tin chi tiet 1 san pham
    const{id} = req.params;
    const weapons = await weaponsController.getByIdWeapon(id);
    let {body, file, params} = req;
    delete body.image;
    let image = weapons.image;
    if(file){
      image = `/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    await weaponsController.editWeapons(params.id, body);
    res.redirect('/admin/weapons');
  });

  router.get('/create',[authentication.checkAdmin], async function (req, res, next) {
    res.render('admin/weapons/create',{layout:'layout/admin/layout_add_product'});
  });
  
  router.post('/post',[upload.single('image'),authentication.checkAdmin],async function (req, res, next) {
    let{body, file} = req;
    let image = '';
    if(file){
       image = `/images/img_product/${file.filename}`
    }
    body = {...body, image: image}
    await weaponsController.insertWeapons(body);
    res.redirect('/admin/weapons');
  });
  
  router.post("/:id/hidden", async function (req, res, next) {
    const { id } = req.params;
    await weaponsController.hidden(id);
    res.json({ result: true });
  });
  
  router.post("/:id/unhidden", async function (req, res, next) {
    const { id } = req.params;
    await weaponsController.unHidden(id);
    res.json({ result: true });
  });

module.exports = router;