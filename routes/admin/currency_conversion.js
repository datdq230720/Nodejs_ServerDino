var express = require('express');
var router = express.Router();

var flash = require('connect-flash');
router.use(flash());

const authentication = require('../../components/middle/authentication');
const upload = require('../../components/middle/upload');

const ConversionController = require('../../components/currency_conversion/controller');

router.get('/', [authentication.checkAdmin], async function (req, res, next) {
    const currency_conversion = await ConversionController.getCurrencyConversion();
    res.render('admin/CurrencyConversion/index', { currency_conversion: currency_conversion, layout: 'layout/admin/index' });
  });
  
  router.get('/information/:id/edit', [authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    const currency_conversion = await ConversionController.getCurrencyConversionById(id);
    res.render('admin/CurrencyConversion/edit', {layout: 'layout/admin/index',currency_conversion:currency_conversion});
  });
  
  
  router.post('/information/:id/post',[upload.single('image'), authentication.checkAdmin],async function(req, res, next){
    //cap nhat thong tin chi tiet 1 san pham
    const{id} = req.params;
    const currency_conversion = await ConversionController.getCurrencyConversionById(id);
    let {body, file, params} = req;
    delete body.image;
    let image = currency_conversion.image;
    if(file){
      image = `/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    await ConversionController.update(params.id, body);
    res.redirect('/admin/currency_conversion');
  });

  router.get('/create',[authentication.checkAdmin], async function (req, res, next) {
    res.render('admin/CurrencyConversion/create',{layout:'layout/admin/layout_add_product'});
  });
  
  router.post('/post',[upload.single('image'),authentication.checkAdmin],async function (req, res, next) {
    let{body, file} = req;
    let image = '';
    if(file){
       image = `/images/img_product/${file.filename}`
    }
    body = {...body, image: image}
    await ConversionController.inserConversion(body);
    res.redirect('/admin/currency_conversion');
  });
  
  router.post("/:id/hidden", async function (req, res, next) {
    const { id } = req.params;
    await ConversionController.hidden(id);
    res.json({ result: true });
  });
  
  router.post("/:id/unhidden", async function (req, res, next) {
    const { id } = req.params;
    await ConversionController.unHidden(id);
    res.json({ result: true });
  });

module.exports = router;