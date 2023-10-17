const AppError = require("../util/appError");
const Artwork = require("./../models/artworkModel");
const catchAsync = require("./../util/catchAsync");
const factory = require("./handlerFactory");

// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filter() {}
// }

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllArtworks = catchAsync(async (req, res, next) => {
  const artworks = await Artwork.find();

  res.status(200).json({
    status: "success",
    results: artworks.length,
    data: {
      artworks,
    },
  });
});

exports.getArtwork = factory.getOne(Artwork, { path: "comments" });
exports.createArtwork = factory.createOne(Artwork);
exports.updateArtwork = factory.updateOne(Artwork);
exports.deleteArtwork = factory.deleteOne(Artwork);
