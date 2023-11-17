const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  artwork: String,
  user: String,
  price: Number,
  image: String,
  artworkName: String,
  category: String,
  //   paid: {
  //     type: Boolean,
  //     default: true,
  //   },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
