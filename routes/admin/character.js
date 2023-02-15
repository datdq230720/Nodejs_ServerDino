var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
router.use(flash());

const authentication = require('../../components/middle/authentication');
const upload = require('../../components/middle/upload');

const characterController = require('../../components/character/controller');

router.get('/', [authentication.checkAdmin], async function (req, res, next) {
    const character = await characterController.getAllCharacter();
    res.render('admin/character/index', { character: character, layout: 'layout/admin/index' });
  });
  
  router.get('/information/:id/profile', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const character = await characterController.getByIdCharacter(id);
    res.render('admin/character/profile', {layout: 'layout/admin/index',character:character});
  });
  
  router.get('/information/:id/edit', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const character = await characterController.getByIdCharacter(id);
    res.render('admin/character/edit', {layout: 'layout/admin/index',character:character});
  });
  
  
  router.post('/information/:id/post',[upload.single('image'), authentication.checkAdmin] , async function(req, res, next){
    //cap nhat thong tin chi tiet 1 san pham
    const{id} = req.params;
    const character = await characterController.getByIdCharacter(id);
    let {body, file, params} = req;
    delete body.image;
    let image = character.image;
    if(file){
      image = `/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    await characterController.editCharacter(params.id, body);
    res.redirect('/admin/character');
  });

module.exports = router;