const productService = require('./service');

exports.getProducts = async () => {
  let data = await productService.getProducts();

  data = data.map((item, index) => {
    item = {
      released: item.released,
      _id: item._id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      image: item.image,
      description: item.description,
      category_id: item.category_id,
      index: index + 1
    }

    return item;
  })

  return data;
}

exports.getProductsById = async (id) => {
  let product = await productService.getProductsById(id);
  product = {
    released: product.released,
    _id: product._id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    image: product.image,
    description: product.description,
    category_id: product.category_id
  }

  return product;
}

exports.delete = async (id) => {
  await productService.delete(id);
}
exports.insert = async (body) => {
  await productService.insert(body);
}

exports.update = async (id, product) => {
  await productService.update(id, product);
}