var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
router.use(flash());

const authentication = require('../../components/middle/authentication');
const upload = require('../../components/middle/upload');

const achivementController = require('../../components/achivement/controller');

router.get('/', [authentication.checkAdmin], async function (req, res, next) {
    const achivement = await achivementController.getAllAchievement();
    res.render('admin/achivement/index', { achivement: achivement, layout: 'layout/admin/index' });
  });
  
  router.get('/information/:id/profile', [authentication.checkAdmin],async function (req, res, next) {
    const{id} = req.params;
    const achivement = await achivementController.getOneAchievement(id);
    res.render('admin/achivement/profile', {layout: 'layout/admin/index',achivement:achivement});
  });
  
  router.get('/information/:id/edit', [authentication.checkAdmin],async function (req, res, next) {
    const{id} = req.params;
    const achivement = await achivementController.getOneAchievement(id);
    res.render('admin/achivement/edit', {layout: 'layout/admin/index',achivement:achivement});
  });
  
  router.post('/information/:id/post',[upload.single('image'), authentication.checkAdmin] , async function(req, res, next){
    const{id} = req.params;
    const achivement = await achivementController.getOneAchievement(id);
    let {body, file, params} = req;
    delete body.image;
    let image = achivement.image;
    if(file){
      image = `/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    await achivementController.update(params.id, body);
    res.redirect('/admin/achievements');
  });

module.exports = router;