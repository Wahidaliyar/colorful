const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  artwork: {
    type: mongoose.Schema.ObjectId,
    ref: "Artwork",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    enum: ["pending", "delivering", "completed"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["inperson", "online"],
    default: "online",
  },
});

salesSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "artwork",
    select: "-__v",
  });
  next();
});

const Sale = mongoose.model("Sale", salesSchema);
module.exports = Sale;
