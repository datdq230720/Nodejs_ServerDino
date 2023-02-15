
const categoryController = require('./service');


exports.getCategories = async () => {
    return await categoryController.getCategories();
}

exports.getCategoryById = async (id) => {
    return await categoryController.getCategoryById(id);
}

exports.getCategoriesForOneProduct = async (selectedId) => {
    let categories = await categoryController.getCategories();

    categories = categories.map(item => {
        item ={
            _id:item._id,
            name: item.name,
            description:item.description,
            selected:item._id.toString() == selectedId.toString()
        }
        return item;
    })
    console.log("selectedId is " + categories);
    return categories;
}