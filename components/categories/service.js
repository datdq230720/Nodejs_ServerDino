const categoryModel = require('./model');

exports.getCategories = async() =>{
  const categories= await categoryModel.find();
    return categories;
}

exports.getCategoryById = async(id) =>{
  const category = await categoryModel.findById(id);
  return category;

}
