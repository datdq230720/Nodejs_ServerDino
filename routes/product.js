var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const adminController = require('../components/admin/controller');
const userController = require('../components/users/controller');
const productController = require('../components/product/controller');
const categoryController = require('../components/categories/controller');
const authentication = require('../components/middle/authentication');
const upload = require('../components/middle/upload');


// Render trang list user
router.get('/add_product',[authentication.checkAdmin], async function (req, res, next) {
    const categories = await categoryController.getCategories();
    res.render('product/add_product',{layout:'layout/admin/layout_add_product',categories:categories});
  });
  
  router.post('/',[upload.single('image'),authentication.checkAdmin],async function (req, res, next) {
    // thêm mới sản phẩm vào database
    let{body, file} = req;
    let image = '';
    if(file){
       image = `http://192.168.100.47:3000/images/img_product/${file.filename}`
    }
    body = {...body, image: image}
    await productController.insert(body);
    res.redirect('/products');
  });
  
  router.get('/',[authentication.checkAdmin], async function (req, res, next) {
    // lấy danh sách sản phẩm từ database
    const data = await productController.getProducts();
    res.render('product/list_products',{ products: data , layout:'layout/admin/index'});
  });


  router.get('/:id/edit',[authentication.checkAdmin],async function (req, res, next) {
    // lấy thông tin chi tiết 1 sản phẩm
    const{id} = req.params;
    global.update = id;
    const product = await productController.getProductsById(id);
    const categories = await categoryController.getCategoriesForOneProduct(product.category_id._id);
    res.render('product/product_update',{layout:'layout/admin/layout_add_product',product:product,categories:categories});
  });
  
  
  router.post('/:id/edit',[upload.single('image'),authentication.checkAdmin],async function(req, res, next){
    //cap nhat thong tin chi tiet 1 san pham
    var update = global.update;
    const product = await productController.getProductsById(update);
    let {body, file, params} = req;
    delete body.image;
    let image = product.image;
    if(file){
      image = `http://192.168.100.47:3000/images/img_product/${file.filename}`
    }
    body = { ...body, image: image}
    await productController.update(params.id, body);
    console.log(params.id);
    res.redirect('/products');
  });

  router.delete('/:id/delete',[authentication.checkAdmin],async function (req, res, next) {
    // xóa 1 sản phẩm khỏi database
    const{id} = req.params;
    console.log("=============",id);
    await productController.delete(id);
    console.log("id",id);
    res.json({result : true});
  });
  

module.exports = router;
