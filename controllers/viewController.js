const catchAsync = require("./../util/catchAsync");
const Artwork = require("./../models/artworkModel");
const AppError = require("../util/appError");
const User = require("./../models/userModel");
const Artist = require("./../models/artistModel");
const Order = require("./../models/orderModel");
const Cart = require("../models/cartModel");

exports.getHomePage = catchAsync(async (req, res) => {
  const TenNewArtwork = await Artwork.find().sort("-createdAt").limit(8);

  res.status(200).render("home", {
    title: `جلوه‌های رنگین | صفحه اصلی`,
    TenNewArtwork,
  });
});

exports.getOrderPage = catchAsync(async (req, res) => {
  res.status(200).render("order", {
    title: `جلوه‌های رنگین | سفارش نقاشی`,
    active: "order",
  });
});

exports.getProductsPage = catchAsync(async (req, res) => {
  const filter = req.query.filter || "";
  let sortQuery = "";
  if (filter == "expensive") sortQuery = "-price";
  else if (filter == "cheap") sortQuery = "price";
  else sortQuery = "-createdAt";
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const artworks = await Artwork.find()
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Artwork.countDocuments();
  const numOfPages = Math.ceil(count / limit);
  const next = page >= numOfPages ? false : page + 1;
  const prev = page === 1 ? false : page - 1;
  const currentPage = page;
  const num = [];
  const startIndex = (page - 1) * limit + 1;
  if (numOfPages > 1) {
    for (let i = 1; i <= numOfPages; i++) {
      num.push(i);
    }
  }
  res.status(200).render("products", {
    title: `جلوه‌های رنگین | تابلوها`,
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    artworks,
    startIndex,
    limit,
    count,
  });
});

exports.getSingleProduct = catchAsync(async (req, res) => {
  const artwork = await Artwork.findOne({ _id: req.params.id });

  res.status(200).render("singleProduct", {
    title: `جلوه‌های رنگین | ${artwork.name}`,
    artwork,
  });
});

exports.getContactPage = catchAsync(async (req, res) => {
  res.status(200).render("contact", {
    title: `جلوه‌های رنگین | ارتباط باما`,
  });
});

exports.getArtistsPage = catchAsync(async (req, res) => {
  const artists = await Artist.find();

  res.status(200).render("artists", {
    title: "Colorful Effects | Artists",
    artists,
  });
});

exports.getSingleArtist = catchAsync(async (req, res) => {
  const art = await Artist.findById(req.params.id);
  const artworks = await Artwork.find({ artist: art._id });

  if (!art) return next(new AppError("Artist not found!", 404));

  res.status(200).render("singleArtist", {
    title: `جلوه‌های رنگین | هنرمندان`,
    art,
    artworks,
  });
});

exports.getAboutPage = catchAsync(async (req, res) => {
  res.status(200).render("about", {
    title: `جلوه‌های رنگین | درباره ما`,
  });
});

exports.getMePage = catchAsync(async (req, res) => {
  const me = await User.findById(req.params.id);

  res.status(200).render("me", {
    title: `جلوه‌های رنگین | پروفایل`,
    me,
  });
});

exports.getCart = catchAsync(async (req, res) => {
  // if(!req.params.user)
  const items = await Cart.find({ user: req.query.user });

  res.status(200).render("cart", {
    title: `جلوه‌های رنگین | سبد خرید`,
    items,
  });
});

// DASHBOARD ROUTE CONTROLLERS
exports.getDashboard = catchAsync(async (req, res) => {
  res.status(200).render("dashboard/products", {
    title: `جلوه‌های رنگین |  داشبورد`,
    active: "dashboard",
  });
});

/////// Artwork
exports.getDashboardProducts = catchAsync(async (req, res) => {
  const searchTerm = req.query.search || "";
  let query = {};
  if (searchTerm) {
    query = { name: { $regex: searchTerm } };
  }
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const artworks = await Artwork.find(query)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Artwork.countDocuments(query);
  const numOfPages = Math.ceil(count / limit);
  const next = page >= numOfPages ? false : page + 1;
  const prev = page === 1 ? false : page - 1;
  const currentPage = page;
  const num = [];
  const startIndex = (page - 1) * limit + 1;
  if (numOfPages > 1) {
    for (let i = 1; i <= numOfPages; i++) {
      num.push(i);
    }
  }

  res.status(200).render("dashboard/products", {
    title: `داشبورد |  محصولات`,
    active: "products",
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    artworks,
    startIndex,
  });
});

exports.getAdminSingleProduct = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id).populate({
    path: "artist",
    select: "-image -artworks",
  });

  if (!artwork) return next(new AppError("Page not found!", 404));

  res.status(200).render(`dashboard/singleArtwork`, {
    title: `داشبورد |  ${artwork.name}`,
    active: "products",
    artwork,
  });
});

exports.getUpdateArtwork = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  const artists = await Artist.find().select("name _id").exec();

  if (!artwork) return next(new AppError("Page not found!", 404));

  res.status(200).render(`dashboard/updateArtwork`, {
    title: `داشبورد |  ${artwork.name}`,
    active: "products",
    artwork,
    artists,
  });
});

exports.getNewArtwork = catchAsync(async (req, res, next) => {
  const artists = await Artist.find().select("name _id").exec();

  res.status(200).render(`dashboard/newArtwork`, {
    title: `داشبورد | تابلوی جدید`,
    active: "products",
    artists,
  });
});

exports.getDashboardUsers = catchAsync(async (req, res) => {
  const searchTerm = req.query.search || "";
  let query = {};
  if (searchTerm) {
    query = { name: { $regex: searchTerm }, role: { $ne: "admin" } };
  } else {
    query = { role: { $ne: "admin" } };
  }
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const users = await User.find(query)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await User.countDocuments(query);
  const numOfPages = Math.ceil(count / limit);
  const next = page >= numOfPages ? false : page + 1;
  const prev = page === 1 ? false : page - 1;
  const currentPage = page;
  const num = [];
  const startIndex = (page - 1) * limit + 1;
  if (numOfPages > 1) {
    for (let i = 1; i <= numOfPages; i++) {
      num.push(i);
    }
  }

  res.status(200).render("dashboard/users", {
    title: `داشبورد |  کاربرها`,
    active: "users",
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    users,
    startIndex,
  });
});

//////////////// ARTISTS
exports.getDashboardArtists = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const artists = await Artist.find()
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Artist.countDocuments();
  const numOfPages = Math.ceil(count / limit);
  const next = page >= numOfPages ? false : page + 1;
  const prev = page === 1 ? false : page - 1;
  const currentPage = page;
  const num = [];
  const startIndex = (page - 1) * limit + 1;
  if (numOfPages > 1) {
    for (let i = 1; i <= numOfPages; i++) {
      num.push(i);
    }
  }

  res.status(200).render("dashboard/artists", {
    title: `داشبورد |  هنرمندان`,
    active: "artists",
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    artists,
    startIndex,
  });
});

exports.getAdminSingleArtist = catchAsync(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) return next(new AppError("Page not found!", 404));

  res.status(200).render(`dashboard/singleArtist`, {
    title: `داشبورد |  ${artist.name}`,
    active: "artists",
    artist,
  });
});

exports.getUpdateArtist = catchAsync(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) return next(new AppError("Page not found!", 404));

  res.status(200).render(`dashboard/updateArtist`, {
    title: `داشبورد |  ${artist.name}`,
    active: "artists",
    artist,
  });
});

exports.getNewArtist = catchAsync(async (req, res, next) => {
  res.status(200).render(`dashboard/newArtist`, {
    title: `داشبورد | هنرمند جدید`,
    active: "artists",
    // artists,
  });
});

exports.getDashboardOrders = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const orders = await Order.find()
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Order.countDocuments();
  const numOfPages = Math.ceil(count / limit);
  const next = page >= numOfPages ? false : page + 1;
  const prev = page === 1 ? false : page - 1;
  const currentPage = page;
  const num = [];
  const startIndex = (page - 1) * limit + 1;
  if (numOfPages > 1) {
    for (let i = 1; i <= numOfPages; i++) {
      num.push(i);
    }
  }

  res.status(200).render("dashboard/orders", {
    title: `داشبورد |  هنرمندان`,
    active: "orders",
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    orders,
    startIndex,
  });
});

exports.getDashboardSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError("Page not found!", 404));

  res.status(200).render(`dashboard/singleOrder`, {
    title: `داشبورد |  ${order.name}`,
    active: "orders",
    order,
  });
});

exports.getDashboardMe = catchAsync(async (req, res) => {
  const me = await User.findById(req.params.id);

  res.status(200).render("dashboard/me", {
    title: `جلوه‌های رنگین | پروفایل`,
    me,
  });
});
