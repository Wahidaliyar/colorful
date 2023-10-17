const catchAsync = require("./../util/catchAsync");
const Artwork = require("./../models/artworkModel");

exports.getHomePage = catchAsync(async (req, res) => {
  const TenNewArtwork = await Artwork.find().sort("-createdAt").limit(8);

  res.status(200).render("home", {
    title: `جلوه‌های رنگین | صفحه اصلی`,
    TenNewArtwork
  });
});

exports.getOrder = catchAsync(async (req, res) => {
  res.status(200).render("order", {
    title: "Order an Artwork",
  });
});

exports.getProductsPage = catchAsync(async (req, res) => {
  const artworks = await Artwork.find();
  res.status(200).render("products", {
    title: "All Artwork",
    artworks,
  });
});

exports.getSingleProduct = catchAsync(async (req, res) => {
  const artwork = await Artwork.findOne({ _id: req.params.id });

  res.status(200).render("singleProduct", {
    title: `جلوه‌های رنگین | ${artwork.name}`,
    artwork,
  });
});

exports.getSingleArtist = catchAsync(async (req, res) => {
  res.status(200).render("singleArtist", {
    title: "Colorful Effects | Artists",
  });
});

exports.getContactPage = catchAsync(async (req, res) => {
  res.status(200).render("contact", {
    title: "Colorful Effects | Contact us",
  });
});

exports.getArtistsPage = catchAsync(async (req, res) => {
  res.status(200).render("artists", {
    title: "Colorful Effects | Artists",
  });
});

exports.getAboutPage = catchAsync(async (req, res) => {
  res.status(200).render("about", {
    title: "Colorful Effects | About us",
  });
});
