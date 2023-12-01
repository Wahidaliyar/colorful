const express = require("express");
const salesController = require("./../controllers/salesController");
const router = express.Router();

router.post('/checkout-session', salesController.getCheckoutSession)

module.exports = router;
