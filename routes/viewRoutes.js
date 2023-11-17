const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewController.getHomePage);
router.get("/products/:id", viewController.getSingleProduct);
router.get("/products", viewController.getProductsPage);
router.get("/order", viewController.getOrderPage);
router.get("/contact", viewController.getContactPage);
router.get("/artists", viewController.getArtistsPage);
router.get("/artists/:id", viewController.getSingleArtist);
router.get("/about", viewController.getAboutPage);
router.get("/me/:id", viewController.getMePage);
router.get("/cart", viewController.getCart);

// DASHBOARD ROUTES
router.get(
  "/dashboard",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboard
);

//////////////// ARTWORK
router.get(
  "/dashboard/products",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboardProducts
);
router.get(
  "/dashboard/products/update/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getUpdateArtwork
);
router.get(
  "/dashboard/products/new",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getNewArtwork
);
router.get(
  "/dashboard/products/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminSingleProduct
);


/////////////// USER
router.get(
  "/dashboard/users",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboardUsers
);

//////////////////// ARTISTS
router.get(
  "/dashboard/artists",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboardArtists
);
router.get(
  "/dashboard/artists/new",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getNewArtist
);
router.get(
  "/dashboard/artists/update/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getUpdateArtist
);
router.get(
  "/dashboard/artists/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminSingleArtist
);
router.get(
  "/dashboard/orders",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboardOrders
);
router.get(
  "/dashboard/orders/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getDashboardSingleOrder
);

router.get("/dashboard/me/:id", viewController.getDashboardMe);

module.exports = router;
