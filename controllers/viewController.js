const catchAsync = require("./../util/catchAsync");
const Artwork = require("./../models/artworkModel");
const AppError = require("../util/appError");
const User = require("./../models/userModel");
const Artist = require("./../models/artistModel");
const Order = require("./../models/orderModel");
const Cart = require("../models/cartModel");
const Sale = require("../models/salesModel");

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
  const artworks = await Artwork.find({ state: { $ne: "sold" } })
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Artwork.countDocuments({ state: { $ne: "sold" } });
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
    sortValue: filter,
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

exports.getPurchase = catchAsync(async (req, res) => {
  const items = await Sale.find({ user: req.query.user }).sort("-createdAt");

  let dates = [];
  for (let element of items) {
    const date = new Date(element.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    dates.push(formattedDate);
  }

  res.status(200).render("purchases", {
    title: `جلوه‌های رنگین | خرید‌های من `,
    items,
    dates,
  });
});

exports.getSinglePurchase = catchAsync(async (req, res) => {
  const item = await Sale.findById(req.params.id);

  const origDate = new Date(item.createdAt);
  const date = `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;

  console.log(item.artwork.artist.name);

  res.status(200).render("singlePurchase", {
    title: `جلوه‌های رنگین | خرید‌های من `,
    item,
    date,
  });
});

// DASHBOARD ROUTE CONTROLLERS
exports.getDashboard = catchAsync(async (req, res) => {
  const countUser = await User.countDocuments({ role: "user" });
  const countOrders = await Order.countDocuments({ state: "working" });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of the day

  const inpersonSales = await Sale.aggregate([
    {
      $match: {
        type: "inperson",
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$price" },
      },
    },
  ]);

  const onlineSales = await Sale.aggregate([
    {
      $match: {
        type: "online",
        state: "completed",
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$price" },
      },
    },
  ]);

  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const monthlySales = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$price" },
      },
    },
  ]);

  res.status(200).render("dashboard/dashboard", {
    title: `جلوه‌های رنگین |  داشبورد`,
    active: "dashboard",
    countOrders,
    inpersonSales: inpersonSales[0].totalPrice,
    onlineSales: onlineSales[0].totalPrice,
    monthlySales: monthlySales[0].totalPrice,
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notiSales = await Sale.find({ state: "pending" });
  const notiOrders = await Order.find({ state: "pending" });

  const nots = [...notiSales, ...notiOrders];

  nots.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  res.status(200).json({
    status: "success",
    items: nots,
  });
});

exports.getMonthlyPrices = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 11,
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const result = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalPrice: { $sum: "$price" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const monthlyPrices = [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < 12; i++) {
    const monthNumber = i + 1;
    const resultItem = result.find((item) => item._id === monthNumber);
    const monthName = monthNames[i];
    const totalPrice = resultItem ? resultItem.totalPrice : 0;

    monthlyPrices.push({ month: monthName, totalPrice });
  }

  res.status(200).json({
    status: "success",
    data: monthlyPrices,
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

exports.getDashboardSales = catchAsync(async (req, res) => {
  let salesType = "online";
  if (req.query.type) {
    salesType = req.query.type
  }

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const sales = await Sale.find({ type: salesType })
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Sale.countDocuments({ type: salesType });
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

  res.status(200).render("dashboard/sales", {
    title: `داشبورد | فروشات`,
    active: "sales",
    num: num.length > 0 ? num : 1,
    next,
    prev,
    currentPage,
    sales,
    startIndex,
    salesType
  });
});
