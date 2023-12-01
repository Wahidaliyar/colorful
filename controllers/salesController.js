// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51OFsOtCXfZXrAlJ5BSprWrnFY4v3D6Mvdgh2rBiNs5OLIU7e1K3Sp6GxOTljIa9L45D36fZnosC8f5lmKB6cwdnE00ANnC6HX6"
);

const Sale = require("./../models/salesModel");
const Cart = require("./../models/cartModel");
const Artwork = require("./../models/artworkModel");
const User = require("./../models/userModel");
const catchAsync = require("./../util/catchAsync");

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently bought artwork
//   const artwork = await Artwork.findById(req.params.artworkId);
//   const user = await User.findById(req.params.userId);

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     success_url: `${req.protocol}://${req.get("host")}/?artwork=${
//       req.params.artworkId
//     }&user=${req.params.userId}&price=${artwork.price}`,
//     cancel_url: `${req.protocol}://${req.get("host")}/`,
//     customer_email: user.email,
//     client_reference_id: req.params.artworkId,
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           unit_amount: artwork.price * 100,
//           product_data: {
//             name: `تابلوی نقاشی ${artwork.name}`,
//           },
//         },
//         quantity: 1,
//       },
//     ],
//   });

//   // 3) Create session as response
//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const artworkIds = req.body.artworkIds;
    const userId = req.body.userId;

    // 1) Get the currently bought artworks
    const artworks = await Artwork.find({ _id: { $in: artworkIds } });
    const user = await User.findById(userId);

    let prices = [];
    for (let i = 0; i < artworks.length; i++) {
      prices.push(artworks[i].price);
    }

    // 2) Create checkout session
    const lineItems = artworks.map((artwork) => {
      return {
        price_data: {
          currency: "afn",
          unit_amount: artwork.price * 100,
          product_data: {
            name: `تابلوی نقاشی ${artwork.name}`,
          },
        },
        quantity: 1,
        
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/?artworks=${artworkIds.join(",")}&user=${userId}&prices=${prices.join(
        ","
      )}`,
      cancel_url: `${req.protocol}://${req.get("host")}/`,
      customer_email: user.email,
      client_reference_id: artworkIds.join(","),
      line_items: lineItems,
    });

    // 3) Create session as response
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      // message: "An error occurred while creating the checkout session.",
      message: err.message,
    });
  }
};

exports.createSaleCheckout = catchAsync(async (req, res, next) => {
  const { artworks, user, prices } = req.query;
  console.log(prices)

  if (!artworks || !user || !prices) return next();

  const artworkIds = artworks.split(",");
  const artworkPrices = prices.split(",");

  console.log(artworkIds, artworkPrices, user);

  const sales = [];

  for (let i = 0; i < artworkIds.length; i++) {
    const artwork = artworkIds[i];
    const price = artworkPrices[i];

    const sale = await Sale.create({ artwork, user, price });
    await Cart.deleteMany({ artwork: artwork });
    await Artwork.findByIdAndUpdate(artwork, { state: "sold" });
    sales.push(sale);
  }

  res.redirect(req.originalUrl.split("?")[0]);
});

// exports.createSaleCheckout = catchAsync(async (req, res, next) => {
//   const { artwork, user, price } = req.query;

//   if (!artwork && !user && !price) return next();

//   await Sale.create({ artwork, user, price });

//   res.redirect(req.originalUrl.split("?")[0]);
// });
