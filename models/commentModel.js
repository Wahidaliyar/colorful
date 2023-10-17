const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "A comment cannot be empty."],
      trim: true,
    },
    artwork: {
      type: mongoose.Schema.ObjectId,
      ref: "Artwork",
      required: [true, "Comment must belong to a tour."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: "artwork",
  //     select: "name",
  //   }).populate({
  //     path: "user",
  //     select: "name photo",
  //   });

  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
