const Cart = require("../models/cartModel");
const catchAsync = require("../util/catchAsync");

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//     // 1) Create chechout session
//     const session = await
// })

exports.addToCart = catchAsync(async (req, res, next) => {
  const itemInCart = await Cart.findOne({
    artwork: req.body.artwork,
    user: req.body.user,
  });

  let item = "";
  if (!itemInCart) {
    item = await Cart.create(req.body);
  }

  res.status(201).json({
    status: item ? "success" : "error",
    data: {
      item,
    },
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const item = await Cart.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
