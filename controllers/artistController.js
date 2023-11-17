const Artist = require("./../models/artistModel");
const catchAsync = require("../util/catchAsync");
const factory = require("./handlerFactory");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/artist");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `artist-${Math.random()}-${Date.now()}.${ext}`);
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

exports.uploadArtistPhoto = upload.single("image");

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
  const artist = await Artist.findById(req.params.id).populate("artworks");

  res.status(200).json({
    status: "success",
    data: {
      artist,
    },
  });
});

exports.updateArtist = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const doc = await Artist.findByIdAndUpdate(req.params.id, req.body, {
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

exports.createArtist = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const artist = await Artist.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      artist,
    },
  });
});
exports.deleteArtist = factory.deleteOne(Artist);
