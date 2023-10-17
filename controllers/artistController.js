const Artist = require("./../models/artistModel");
const catchAsync = require("../util/catchAsync");
const factory = require("./handlerFactory");

exports.getAllArtists = catchAsync(async (req, res, next) => {
  const artists = await Artist.find();

  res.status(200).json({
    status: "success",
    data: {
      artists,
    },
  });
});

exports.getArtist = catchAsync(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      artist,
    },
  });
});

exports.createArtist = factory.createOne(Artist);
exports.updateArtist = factory.updateOne(Artist);
exports.deleteArtist = factory.deleteOne(Artist);
