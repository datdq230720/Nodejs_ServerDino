var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
router.use(flash());

const authentication = require('../../components/middle/authentication');
const upload = require('../../components/middle/upload');

const monterController = require('../../components/monter/controller');

router.get('/', [authentication.checkAdmin], async function (req, res, next) {
    const monter = await monterController.getAllMonter();
    res.render('admin/Monter/index', { monter: monter, layout: 'layout/admin/index' });
  });
  
  router.get('/information/:id/profile', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const monter = await monterController.getByIdWeapon(id);
    res.render('admin/Monter/profile', {layout: 'layout/admin/index',monter:monter});
  });
  
  router.get('/information/:id/edit', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const monter = await monterController.getByIdWeapon(id);
    res.render('admin/Monter/edit', {layout: 'layout/admin/index',monter:monter});
  });
  
  
  router.post('/information/:id/post',[upload.single('image'), authentication.checkAdmin],async function(req, res, next){
    //cap nhat thong tin chi tiet 1 san pham
    const{id} = req.params;
    const monter = await monterController.getByIdWeapon(id);
    let {body, file, params} = req;
    delete body.image;
    let image = monter.image;
    if(file){
      image = `/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    
    await monterController.update(params.id, body);
    res.redirect('/admin/monter');
  });

  router.delete('/:id/delete',[authentication.checkAdmin],async function (req, res, next) {
    // xóa 1 sản phẩm khỏi database
    const{id} = req.params;
    await monterController.delete(id);
    res.json({result : true});
  });

  router.get('/create',[authentication.checkAdmin], async function (req, res, next) {
    res.render('admin/Monter/create',{layout:'layout/admin/layout_add_product'});
  });
  
  router.post('/post',[upload.single('image'),authentication.checkAdmin],async function (req, res, next) {
    let{body, file} = req;
    let image = '';
    if(file){
       image = `/images/img_product/${file.filename}`
    }
    body = {...body, image: image}
    await monterController.insertMonter(body);
    res.redirect('/admin/monter');
  });
  
  router.post("/:id/hidden", async function (req, res, next) {
    const { id } = req.params;
    await monterController.hidden(id);
    res.json({ result: true });
  });
  
  router.post("/:id/unhidden", async function (req, res, next) {
    const { id } = req.params;
    await monterController.unHidden(id);
    res.json({ result: true });
  });

module.exports = router;