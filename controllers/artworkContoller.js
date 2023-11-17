const AppError = require("../util/appError");
const Artwork = require("./../models/artworkModel");
const catchAsync = require("./../util/catchAsync");
const factory = require("./handlerFactory");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/artwork");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `artwork-${Math.random()}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفاٌ عکس انتخاب کنید!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadArtworkPhoto = upload.single("image");

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

exports.createArtwork = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const artwork = await Artwork.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      artwork,
    },
  });
});

exports.updateArtwork = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const doc = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) return next(new AppError("No document found with that ID!", 404));

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getArtwork = factory.getOne(Artwork, { path: "artist" });

exports.deleteArtwork = factory.deleteOne(Artwork);
