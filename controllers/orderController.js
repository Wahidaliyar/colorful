const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const Order = require("./../models/orderModel");
const factory = require("./handlerFactory");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/order");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `order-${Math.trunc(Math.random() * 20)}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.uploadOrderPhoto = upload.single("image");

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.image = req.file.filename;
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newOrder,
    },
  });
});


exports.deleteOrder = factory.deleteOne(Order);
