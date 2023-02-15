const productModel = require('./model');
/**
 * lấy danh sách sản phẩm
 */
exports.getProducts = async () =>{
  const product = await productModel.find().populate('category_id');
  console.log(">>>",product);
    return product;
    
}

exports.getProductsById = async (id) =>{
  const product = await productModel.findById(id).populate('category_id');
  console.log(product,id);
  return product;
}

exports.delete = async(id) =>{
  console.log(">>>>>>deletesv",id);
  await productModel.findByIdAndDelete(id);
}
exports.insert = async (product) => {
  const p= new productModel(product);
  await p.save();
}

exports.update = async (id, product) => {
  console.log(id);
  await productModel.findByIdAndUpdate(id,product);
}
