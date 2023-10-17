const Comment = require("./../models/commentModel");
const catchAsync = require("./../util/catchAsync");
const factory = require("./handlerFactory");

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.artworkId) filter = { artwork: req.params.artworkId };

  const comments = await Comment.find();

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.setArtworkUserIds = (req, res, next) => {
  // Allows nested routes
  if (!req.body.artwork) req.body.artwork = req.params.artworkId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
