const catchAsync = require("../util/catchAsync");
const Category = require("./../models/categoryModel");
const factory = require("./handlerFactory");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
