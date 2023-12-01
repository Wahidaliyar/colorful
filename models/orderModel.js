const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must type your first name"],
    },
    phone: {
      type: String,
      required: [true, "You must type your phone number"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
      },
    image: String,
    height: Number,
    width: Number,
    description: {
      type: String,
      trim: true,
    },
    technique: String,
    state: {
      type: String,
      enum: ["pending", "working", "completed"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // comment: [{ type: mongoose.Schema.ObjectId, ref: '' }],
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;