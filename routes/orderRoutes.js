const express = require("express");
const orderController = require("./../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .post(orderController.uploadOrderPhoto, orderController.createOrder);

router.route("/:id").delete(orderController.deleteOrder);

module.exports = router;
